export interface Option {
    title: string;
    key: string;
}

export interface QuestionsResponse extends QuestionsPayload {
    created_at: string;
    created_by: string;
    updated_at: string;
}

export interface QuestionsPayload {
    answer: string;
    is_active: boolean;
    options: Option[];
    tags: string;
    title: string;
    topic_id: string;
}
