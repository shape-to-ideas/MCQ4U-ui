import { QuestionsPayload } from './request.interface';

export interface LoginResponse {
    token: string;
}

export interface QuestionsResponse extends QuestionsPayload {
    created_at: string;
    created_by: string;
    updated_at: string;
    _id: { $oid: string };
}

export interface Topic {
    _id: {
        $oid: string;
    };
    name: string;
    created_by: string;
}

export interface AttemptedQuestions {
    _id: {
        $oid: string;
    };
    user_id: string;
    question_id: string;
    option: string;
    created_at: string;
    updated_at: string;
}

export interface CorrectAnswers {
    _id: {
        $oid: string;
    };
    question_id: string;
    answer: string;
    created_at: string;
    updated_at: string;
}

export interface AttemptedQuestionsResponse extends QuestionsResponse {
    topics: Topic[];
    attempted_questions: AttemptedQuestions[];
    correct_answer: CorrectAnswers[];
}
