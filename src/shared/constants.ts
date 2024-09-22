import { Validators } from '@angular/forms';

export const LOCAL_STORAGE_KEYS = {
    USER: 'user',
};

export const PAGE_ROUTES = {
    LOGIN: 'login',
    DASHBOARD: 'dashboard',
    REGISTER: 'register',
    QUESTIONS: 'questions',
};

export enum API_PATHS {
    LOGIN = '/api/v1/user/login',
    REGISTER = '/api/v1/user/register',
    QUESTIONS = '/api/v1/questions',
    TOPICS = '/api/v1/topics',
}

export interface UserSessionData {
    token: string;
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
}

export interface TopicsResponse {
    created_by: string;
    name: string;
    _id: { $oid: string };
}
