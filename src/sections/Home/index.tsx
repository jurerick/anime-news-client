import React, { useState } from "react";
import { Layout, Tabs } from "antd";
import { NEWS } from "../../lib/graphql/queries";
import { News as NewsData, NewsVariables} from "../../lib/graphql/queries/News/types";
import { useQuery } from "@apollo/client";
import { HomeSkeleton } from "../HomeSkeleton";
import { NewsList } from "./../News/components/NewsList";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs; 
const { Content } = Layout;

const PAGE_LIMIT = 15;

export const Home = () => {

    const navigate = useNavigate();
    
    const [ newsPage, setNewsPage ] = useState(1);
    const [ newsPageSize, setNewsPageSize ] = useState(PAGE_LIMIT);

    const { data, loading } = useQuery<NewsData, NewsVariables>(NEWS, {
        variables: {
            page: newsPage,
            limit: newsPageSize
        }
    });


    const handleTabChange = (key: string) => {
        if(key === "popular") {
            navigate("/news/popular");
        }
    }

    const renderNewsElement = () => {
        if(loading) {
            return <HomeSkeleton />
        }
        if(data) {
            return (
              <NewsList
                data={data.news}
                page={newsPage}
                pageSize={newsPageSize}
                setNewsPage={setNewsPage}
                setNewsPageSize={setNewsPageSize}
              />
            );
        }
    }


    return (
      <Content className="default-layout home">
        <Tabs
            activeKey="all"
            onChange={(tabKey) => {
                handleTabChange(tabKey);
            }}
        >
          <TabPane tab="All" key="all">
            {renderNewsElement()}
          </TabPane>

          <TabPane tab="Popular" key="popular">
          </TabPane>

        </Tabs>
      </Content>
    );
};
