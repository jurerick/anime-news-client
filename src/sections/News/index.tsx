import React, { useState } from "react";
import { Layout, Tabs } from "antd";
import { useQuery } from "@apollo/client";
import { NewsPopular as NewsPopularData, NewsVariables} from "../../lib/graphql/queries/News/types";
import { NEWS_POPULAR } from "../../lib/graphql/queries";
import { HomeSkeleton } from "../HomeSkeleton";
import { NewsList } from "./components";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs; 
const { Content } = Layout;

const PAGE_LIMIT = 15;

export const News = () => {

    const navigate = useNavigate();

    const [ popularNewsPage, setPopularNewsNewsPage ] = useState(1);
    const [ popularNewsPageSize, setPopularNewsPageSize ] = useState(PAGE_LIMIT);

    const { data, loading } = useQuery<NewsPopularData, NewsVariables>(NEWS_POPULAR, {
        variables: {
            page: popularNewsPage,
            limit: popularNewsPageSize
        }
    });

    const handleTabChange = (key: string) => {
        if(key === "all") {
            navigate("/");
        }
    }


    const renderNewsElement = () => {
        if(loading) {
            return <HomeSkeleton />
        }
        if(data) {
            return (
              <NewsList
                data={data.newsPopular}
                page={popularNewsPage}
                pageSize={popularNewsPageSize}
                setNewsPage={setPopularNewsNewsPage}
                setNewsPageSize={setPopularNewsPageSize}
              />
            );
        }
    }

    return (
        <Content className="default-layout home">
            <Tabs
                activeKey="popular"
                onChange={(tabKey) => {
                    handleTabChange(tabKey);
                }}
            >
            <TabPane tab="All" key="all">
            </TabPane>

            <TabPane tab="Popular" key="popular">
                {renderNewsElement()}
            </TabPane>
            
            </Tabs>
        </Content>
    );
}