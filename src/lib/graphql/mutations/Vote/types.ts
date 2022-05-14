export interface CreateVoteInput {
    news_source_id: string;
    news_keyword: string;
    news_source_name: string;
    published_at: string;
}

export interface CreateVoteVariables {
    input: CreateVoteInput;
}

export interface UpdateVoteInput {
    news_keyword: string;
    news_source_id: string;
    news_source_name: string;
    _method: string;
    upvote: boolean;
    published_at: string;
}

export interface UpdateVoteVariables {
    input: UpdateVoteInput;
}

export interface Vote {
    id: number;
    news_source: string;
    news_keyword: string;
    count: number;
    created_at: string;
    updated_at: string;
}