import { Option } from '../interfaces';

export interface QuestionAttemptPayload {
    question_id: string;
    option: string;
}

export interface QuestionsPayload {
    answer: string;
    is_active: boolean;
    options: Option[];
    tags: string;
    title: string;
    topic_id: string;
}
