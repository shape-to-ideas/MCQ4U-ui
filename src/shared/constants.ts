export const LOCAL_STORAGE_KEYS = {
    USER: 'user',
};

export const PAGE_ROUTES = {
    LOGIN: 'login',
    DASHBOARD: 'dashboard',
    REGISTER: 'register',
    QUESTIONS: 'questions',
    ATTEMPT_QUESTIONS: 'attempt-questions',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
};

export enum API_PATHS {
    LOGIN = '/api/v1/user/login',
    REGISTER = '/api/v1/user/register',
    QUESTIONS = '/api/v1/questions',
    ATTEMPTED_QUESTIONS = '/api/v1/user/attempted-questions',
    TOPICS = '/api/v1/topics',
    CREATE_TOPICS = '/api/v1/questions/topics',
    ATTEMPT_QUESTIONS = '/api/v1/user/attempt-questions',
    FORGOT_PASSWORD = '/api/v1/user/forgot-password',
    RESET_PASSWORD = '/api/v1/user/reset-password',
    STATS = '/api/v1/stats',
}

export const HEADERS = {
    Authorization: 'Authorization',
};

export const FORM_TYPES = {
    INPUT: 'input',
    RADIO: 'radio',
    TEXTAREA: 'textarea',
    SELECT: 'select',
    SUBMIT_BUTTON: 'submit_button',
    PASSWORD: 'password',
};

export interface FormValidations {
    name: string;
    value: number | boolean;
    errorMessage: string;
}

export interface FormConfigTypes {
    name: string;
    label: string;
    index?: number;
    type: string;
    defaultValue?: string;
    isFormArray?: boolean;
    formArray?: FormConfigTypes[];
    validations?: FormValidations[];
    className?: string;
}

export const ERROR_MESSAGES = {
    QUESTION_SUBMIT_ERROR: 'Error while submitting questions.',
    PASSWORD_MISMATCH: 'Password confirmation does not match',
    REGISTRATIONS_ERROR: 'Error while submitting registration form',
    LOGIN_ERROR: 'Error while logging in',
    ADD_TOPIC_ERROR: 'Error while adding new topic',
    RESET_PASSWORD_ERROR: 'Error while resetting password',
};

export const SUCCESS_MESSAGES = {
    FORGOT_PASSWORD_REQUESTED:
        'If that email is registered, a password reset link has been sent.',
    PASSWORD_RESET: 'Password has been reset successfully. Please log in.',
};

export interface ApiError {
    code: string;
    message: string;
    response: { data: { detail: string; status_code: number } };
}

export const MESSAGE_SERVICE_SEVERITY = {
    SUCCESS: 'success',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    SECONDARY: 'secondary',
    CONTRAST: 'contrast',
};
