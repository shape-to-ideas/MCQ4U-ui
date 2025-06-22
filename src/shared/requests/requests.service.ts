import {
    deleteStorageData,
    getUserSessionDetails,
    resolveJwtToken,
    setStorageData,
} from '../utils/storage';
import { environment } from '../../environments/environment';
import {
    API_PATHS,
    ERROR_MESSAGES,
    LOCAL_STORAGE_KEYS,
    PAGE_ROUTES,
} from '../constants';
import axios, { AxiosResponse } from 'axios';
import { LoginResponse, Topic } from './response.interface';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsPayload } from './request.interface';
import { UserStore } from '../store/user.store';
import { UserSessionData } from '../interfaces';

@Injectable()
export class RequestsService {
    constructor(
        private router: Router,
        private userStore: UserStore,
    ) {
        axios.interceptors.request.use((config) => {
            const token = getUserSessionDetails()?.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.status === 401) {
                    deleteStorageData(LOCAL_STORAGE_KEYS.USER);
                    this.router.navigate([PAGE_ROUTES.LOGIN]);
                }
            },
        );
    }
    async getQuestionsByTopicId(topicId: string) {
        const questionsListApiPath = `${environment.apiUrl}${API_PATHS.QUESTIONS}?topic_id=${topicId}`;
        return axios.get(questionsListApiPath);
    }

    async getAttemptedQuestionsByTopicId(
        topicId: string,
    ): Promise<AxiosResponse<any, any>> {
        const questionsListApiPath = `${environment.apiUrl}${API_PATHS.ATTEMPTED_QUESTIONS}?topic_id=${topicId}`;
        return axios.get(questionsListApiPath);
    }

    async registerUser(registerPayload: any) {
        const registerUrl = `${environment.apiUrl}${API_PATHS.REGISTER}`;
        const response = await axios.post(registerUrl, registerPayload);
        return response.data;
    }

    async userLogin(loginPayload: {
        phone: string;
        password: string;
    }): Promise<LoginResponse> {
        try {
            const loginUrl = `${environment.apiUrl}${API_PATHS.LOGIN}`;
            const loginResponse: AxiosResponse<LoginResponse, any> =
                await axios.post(loginUrl, loginPayload);
            if (loginResponse.status < 200) {
                throw new Error(ERROR_MESSAGES.LOGIN_ERROR);
            }
            setStorageData(
                LOCAL_STORAGE_KEYS.USER,
                JSON.stringify(loginResponse.data),
            );
            const userData = resolveJwtToken(
                loginResponse.data.token,
            ) as UserSessionData;
            this.userStore.updateState(userData);
            return loginResponse.data;
        } catch (error) {
            throw error;
        }
    }

    insertQuestions(questionPayload: {
        data: QuestionsPayload[];
    }): Promise<AxiosResponse<any, any>> {
        return axios.post(
            `${environment.apiUrl}${API_PATHS.QUESTIONS}/create`,
            questionPayload,
        );
    }

    async fetchTopicList(): Promise<Topic[]> {
        const response: AxiosResponse<any, any> = await axios.get(
            `${environment.apiUrl}${API_PATHS.TOPICS}`,
        );
        return response.data;
    }

    attemptQuestions(
        attemptPayload: { question_id: string; option: string }[],
    ): Promise<AxiosResponse<any, any>> {
        return axios.post(
            `${environment.apiUrl}${API_PATHS.ATTEMPT_QUESTIONS}`,
            attemptPayload,
        );
    }

    createTopics(topics: string[]): Promise<AxiosResponse<Topic[]>> {
        return axios.post(`${environment.apiUrl}${API_PATHS.CREATE_TOPICS}`, {
            topic_names: topics,
        });
    }
}
