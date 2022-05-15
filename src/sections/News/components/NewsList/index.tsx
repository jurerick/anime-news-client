/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMutation } from "@apollo/client";
import { Button, List, Result, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NewsList as NewsListData } from "../../../../lib/graphql/queries/News/types";
import { displayErrorMessage } from "../../../../lib/utils";
import {
  Vote as VoteData,
  CreateVoteVariables,
  CreateVoteInput,
  UpdateVoteInput,
  UpdateVoteVariables,
} from "./../../../../lib/graphql/mutations/Vote/types";
import { NewsCard } from "../NewsCard";
import { CREATE_VOTE, UPDATE_VOTE } from "../../../../lib/graphql/mutations";
import { ReloadOutlined } from "@ant-design/icons";

const { Text, Title, Paragraph } = Typography;

interface Props {
    data: NewsListData | null;
    page: number;
    pageSize: number;
    setNewsPage: (page: number) => void;
    setNewsPageSize: (pageSize: number) => void;
    showVotes: boolean;
}

export const NewsList = ({
  data,
  page,
  pageSize,
  setNewsPage,
  setNewsPageSize,
  showVotes
}: Props) => {

  const navigate = useNavigate();

  let newsElement;

  const [ createVote ] = useMutation<VoteData, CreateVoteVariables>(CREATE_VOTE, {
      onError: () => {
          displayErrorMessage(
              "Sorry! we weren't able to save your vote. Please try again later."
          );
      }
  });
  const [ updateVote ] = useMutation<VoteData, UpdateVoteVariables>(UPDATE_VOTE, {
      onError: () => {
          displayErrorMessage(
              "Sorry! we weren't able to save your vote. Please try again later."
          );
      }
  });

  const handleNewsVote = (
      sourceId: string | undefined,
      sourceName: string,
      voteCount: number,
      upvote: boolean,
      publishedAt: string
  ) => {
      const commonFields = {
          news_keyword: '"dragon ball"',
          news_source_id: sourceId,
          news_source_name: sourceName,
          published_at: publishedAt
      };

      if(voteCount <= 0) {
          const input = {
              ...commonFields,
          } as CreateVoteInput;

          createVote({
              variables: { input }
          });
      }
      else {
          const input = {
              ...commonFields,
              _method: "PUT",
              upvote
          } as UpdateVoteInput;

          updateVote({
              variables: { input }
          })
      }
  };

  
  if (data && data.result) {
    newsElement = (
      <List
        locale={{ emptyText: "No anime news at the moment." }}
        pagination={{
          position: "both",
          current: page,
          total: data.total,
          defaultPageSize: pageSize,
          hideOnSinglePage: true,
          showLessItems: true,
          onChange: (page: number) => {
            setNewsPage(page);
          },
          onShowSizeChange: (current: number, size: number) => {
            setNewsPageSize(size);
          },
          pageSizeOptions: [5, 15],
        }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          lg: 3,
          column: 3,
        }}
        dataSource={data.result}
        renderItem={(item, index) => (
          <List.Item>
            <NewsCard 
              newsItem={item} 
              handleNewsVote={ handleNewsVote } 
              showVotes={showVotes} 
            />
          </List.Item>
        )}
      />
    );
  } else {


    // NEWS API developer accounts are limited to a max of 100 results only.
    // Assume for now that if no data has been returned, lets display an error page.

    displayErrorMessage(`You have requested too many results.`)

    newsElement = (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, something went wrong."
        extra={
          <div>
            <div style={{marginBottom: "1em"}}>
              <Paragraph>
                <Title level={5}>You have requested too many results</Title>
                This website is using the <Text mark><a href="https://newsapi.org/" target="_blank" rel="noreferrer">News API</a></Text> {" "}
                with a developer account subscription. Developer accounts are limited to a max of <Text mark>100 results</Text> or <Text mark>100 requests per day</Text>. 
                <br />You may reload the page and see if the issue will be fixed. If not, please wait for 12 to 24 hours for resetting API requests.
              </Paragraph>
              <Paragraph>
                If you want to continue exploring the news using a mock data, please visit mock news page. 
                {" "}
                <a href="#" onClick={(e) => { e.preventDefault(); navigate("/news/mock"); }} target="_self" rel="noreferrer">
                  <strong>Go to Mock News Page</strong>
                </a>
              </Paragraph>
            </div>
            
            <Button
              onClick={() => {
                window.location.reload();
              }}
              type="primary"
            >
              Reload Page <ReloadOutlined />
            </Button>
          </div>
        }
      />
    );
  }

  return newsElement;
};