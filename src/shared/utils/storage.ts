import { LOCAL_STORAGE_KEYS } from '../constants';
import { jwtDecode } from 'jwt-decode';
import { UserSessionData } from '../interfaces';
import { LoginResponse } from '../requests/response.interface';

type ReturnType<T> = T extends (...args: any[] ) => infer R ? R : any 

export function getStorageData(key: string): string {
    return localStorage.getItem(key) ?? '';
}

export function setStorageData(key: string, value: string): void {
    return localStorage.setItem(key, value);
}

export function deleteStorageData(key: string): void {
    return localStorage.removeItem(key);
}

export function getUserSessionDetails() {
    const userDetailString = getStorageData(LOCAL_STORAGE_KEYS.USER);
    if (userDetailString) {
        return JSON.parse(userDetailString) as LoginResponse;
    }
    return null;
}

export function resolveJwtToken(token: string) {
    return jwtDecode(token);
}
