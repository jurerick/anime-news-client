import { Card, List, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";

export const HomeSkeleton = () => {

    const emptyData = [{}, {}, {}, {}, {}, {}];

    return (
        <List
            className="home-skeleton" 
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                lg: 3,
                column: 3
            }}
            dataSource={emptyData}
            renderItem={item => (
                <List.Item>
                    <Card
                        className="news-card"
                        hoverable
                        cover={
                            <Skeleton.Image className="home-skeleton__news-img" />
                        }
                    >
                        <Meta
                            title={
                                <div className="home-skeleton__news-card__meta">
                                    <Skeleton active title={false}  paragraph={{ rows: 1, width: '100%'}} />
                                </div>
                            }
                            description={
                                <div>
                                    <Skeleton active paragraph={{rows: 3}} title={false} />
                                </div>
                            }
                        />
                    </Card>
                </List.Item>
            )}
        />
    );
}