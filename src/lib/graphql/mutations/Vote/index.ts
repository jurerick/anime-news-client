import { gql } from "@apollo/client";

export const CREATE_VOTE = gql`
    mutation CreateVote($input: CreateVoteInput!) {
        createVote(input: $input)
            @rest(type: "Post", path: "votes", method: "POST") {
            id
            news_source
            news_keyword
            count
        }
    }
`;

export const UPDATE_VOTE = gql`
    mutation UpdateVote($input: UpdateVoteInput!) {
        updateVote(input: $input)
            @rest(type: "Post", path: "votes", method: "POST") {
            id
            news_source
            news_keyword
            count
        }
    }
`;