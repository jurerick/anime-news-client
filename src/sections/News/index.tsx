import React, { useState } from "react";
import { Layout, Select, Tabs } from "antd";
import { useQuery } from "@apollo/client";
import { NewsPopular as NewsPopularData, NewsVariables} from "../../lib/graphql/queries/News/types";
import { NEWS_POPULAR } from "../../lib/graphql/queries";
import { HomeSkeleton } from "../HomeSkeleton";
import { NewsList } from "./components";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs; 
const { Content } = Layout;
const { Option } = Select;

const PAGE_LIMIT = 15;
const VOTE_SORTING = "desc";

export const News = () => {

    const navigate = useNavigate();

    const [ popularNewsPage, setPopularNewsPage ] = useState(1);
    const [ popularNewsPageSize, setPopularNewsPageSize ] = useState(PAGE_LIMIT);
    const [ popularNewsVoteSorting, setPopularNewsVoteSorting ] = useState(VOTE_SORTING);

    const { data, loading } = useQuery<NewsPopularData, NewsVariables>(NEWS_POPULAR, {
        variables: {
            page: popularNewsPage,
            limit: 100, // TODO: The value here should be PAGE_LIMIT but need to get more of data for iteration of checking votes to database.
            sort: popularNewsVoteSorting
        },
        fetchPolicy: "cache-and-network"
    });

    const handleTabChange = (key: string) => {
        if(key === "all") {
            navigate("/");
        }
    }

    const handleSortChange = (value: string) => {
        setPopularNewsVoteSorting(value);
    }


    const renderNewsElement = () => {

        if(loading) {
            return <HomeSkeleton />
        }

        if(data) {
            return (
                <div>
                    <Select defaultValue={popularNewsVoteSorting} onChange={handleSortChange}>
                        <Option value="desc">Sort by likes: High to low</Option>
                        <Option value="asc">Sort by likes: Low to high</Option>
                    </Select>

                    <NewsList
                        data={data.newsPopular}
                        page={popularNewsPage}
                        pageSize={popularNewsPageSize}
                        setNewsPage={setPopularNewsPage}
                        setNewsPageSize={setPopularNewsPageSize}
                        showVotes={true}
                    />
                </div>
            );
        }
    }

    return (
        <Content className="default-layout news">
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