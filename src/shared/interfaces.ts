export interface Option {
    title: string;
    key: string;
}

export interface UserSessionData {
    is_admin: boolean;
    id: string;
    expiry: number;
    first_name: string;
    email: string;
    last_name: string;
}
