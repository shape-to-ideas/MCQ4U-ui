export class SharedService {
    constructor() {}

    getStorageData(key: string): string {
        return localStorage.getItem(key) ?? '';
    }

    setStorageData(key: string, value: string): void {
        return localStorage.setItem(key, value);
    }

    deleteStorageData(key: string): void {
        return localStorage.removeItem(key);
    }
}
