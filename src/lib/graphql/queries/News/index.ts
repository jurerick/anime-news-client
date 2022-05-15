import { gql } from '@apollo/client';

export const NEWS = gql`
  query News ($page: Int, $limit: Int) {
    news (page: $page, limit: $limit)
      @rest(type: "News", path: "news/page/{args.page}/limit/{args.limit}") {
      total
      result
    }
  }
`;

export const NEWS_POPULAR = gql`
  query NewsPopular ($page: Int, $limit: Int, $sort: String) {
    newsPopular (page: $page, limit: $limit, sort: $sort)
      @rest(type: "News", path: "news/popular/page/{args.page}/limit/{args.limit}/{args.sort}") {
      total
      result
    }
  }
`;


export const MOCK_NEWS = gql`
  query MockNews {
    mockNews
      @rest(type: "News", path: "news/mock") {
      total
      result
    }
  }
`;