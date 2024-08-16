export interface Option {
    title: string;
    key: string;
}

export interface Questions {
    created_at: string;
    created_by: string;
    is_active: boolean;
    options: Option[];
    tags: string;
    title: string;
    topic_id: string;
    updated_at: string;
}
