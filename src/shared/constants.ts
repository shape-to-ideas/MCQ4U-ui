export const LOCAL_STORAGE_KEYS = {
    USER: 'user',
};

export const PAGE_ROUTES = {
    LOGIN: 'login',
    DASHBOARD: 'dashboard',
    REGISTER: 'register',
    QUESTIONS: 'questions',
};

export interface UserSessionData {
    token: string;
}

export const HEADERS = {
    Authorization: 'Authorization',
};
