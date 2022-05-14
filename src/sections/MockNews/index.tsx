import React, { useState } from "react";
import { Alert, Button, Layout, Tabs } from "antd";
import { MOCK_NEWS } from "../../lib/graphql/queries";
import { MockNews as NewsData, NewsVariables} from "../../lib/graphql/queries/News/types";
import { useQuery } from "@apollo/client";
import { HomeSkeleton } from "../HomeSkeleton";
import { NewsList } from "./../News/components/NewsList";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs; 
const { Content } = Layout;

const PAGE_LIMIT = 15;

export const MockNews = () => {
    
    const navigate = useNavigate();

    const [ newsPage, setNewsPage ] = useState(1);
    const [ newsPageSize, setNewsPageSize ] = useState(PAGE_LIMIT);

    const { data, loading } = useQuery<NewsData, NewsVariables>(MOCK_NEWS, {
        variables: {
            page: newsPage,
            limit: newsPageSize
        }
    });


    const renderNewsElement = () => {
        if(loading) {
            return <HomeSkeleton />
        }
        if(data) {
            return (
              <NewsList
                data={data.mockNews}
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

        <Alert banner
          message="You are visiting Anime News with a mock data."
          description="Pagination feature will not work as expected, and 'popular' menu is disabled. But you can still like an article."
          type="warning"
          action={
            <Button onClick={() => navigate("/") } size="small" danger type="ghost">
              Go to real news data
            </Button>
          }
        />

        <Tabs
            activeKey="all"
        >
          <TabPane tab="All" key="all">
            {renderNewsElement()}
          </TabPane>

          <TabPane tab="Popular" key="popular" disabled>
          </TabPane>

        </Tabs>
      </Content>
    );
};
