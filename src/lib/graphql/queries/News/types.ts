export interface NewsSource {
    id?: string;
    name: string;
}

export interface NewsItem {
    source: NewsSource;
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    voteCount: number;
}

export interface NewsList {
    total: number;
    result: NewsItem[];
}

export interface News {
    news: NewsList | null;
}

export interface NewsPopular {
    newsPopular: NewsList | null;
}

export interface MockNews {
    mockNews: NewsList | null;
}

export interface NewsVariables {
    page: number;
    limit: number;
}