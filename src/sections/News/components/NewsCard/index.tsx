import React, { useState } from "react";
import { Card, Skeleton, Typography } from "antd";
import { NewsItem } from "../../../../lib/graphql/queries/News/types";
import { ExportOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Meta } = Card;

interface Props {
  newsItem: NewsItem;
  handleNewsVote: (
    sourceId: string | undefined,
    sourceName: string,
    voteCount: number,
    upvote: boolean,
    publishedAt: string
  ) => void;
}

export const NewsCard = ({ newsItem, handleNewsVote }: Props) => {

    const [ hasVoted, setHasVoted ] = useState(false);

    const submitVote = () => {

        setHasVoted((hasVotedState) => {
            const status = !hasVotedState;
            handleNewsVote(
                newsItem.source.id,
                newsItem.source.name,
                newsItem.voteCount,
                status,
                newsItem.publishedAt
            );
            return status;
        });
    }
    
    const voteIcon = hasVoted === false ? (
        <LikeOutlined
            style={{ color: '#ed6c21' }} 
            onClick={() =>
                submitVote()
            }
            key="vote"
        />
      ) : (
        <LikeFilled
            style={{ color: '#f9650f' }} 
            onClick={() =>
                submitVote()
            }
            key="unvote"
        />
      );

    
    const photoElement = (newsItem.urlToImage && newsItem.urlToImage !== "") ? (
        <div 
            style={{
                backgroundImage: `url(${newsItem.urlToImage})`
            }}
            className="news-card__news-image">
        </div>
    ): <Skeleton.Image style={{width: 380, height: 200}} />;

    return (
        <Card
            className="news-card"
            cover={ photoElement }
            actions={[voteIcon, 
                <span onClick={() => { return window.open(newsItem.url); }}>
                    <ExportOutlined /> Read Article
                </span>]}
        >
            <Meta
                title={
                    <div className="news-card__meta">
                        <Title level={4} ellipsis={true}>{newsItem.title}</Title>
                    </div>
                }
                description={
                    <div>
                        {newsItem.description}
                    </div>
                }
            />
        </Card>
    );
}