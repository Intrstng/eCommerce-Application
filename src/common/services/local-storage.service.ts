import type { CustomerSignInResult } from '@commercetools/platform-sdk';
import { isCustomerSignInResult } from '../type-guards/customer.guards';

export const STORAGE_KEYS = {
    USER: 'user',
} as const;

export const localStorageService = {
    save(key: string, data: unknown): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Failed to save data to localStorage key "${key}":`, error);
        }
    },

    get(key: string): unknown {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Failed to get data from localStorage key "${key}":`, error);
            return null;
        }
    },

    remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Failed to remove data from localStorage key "${key}":`, error);
        }
    },

    has(key: string): boolean {
        return !!localStorage.getItem(key);
    },
};

export const userStorage = {
    saveUser(user: CustomerSignInResult): void {
        localStorageService.save(STORAGE_KEYS.USER, user);
    },

    getUser(): CustomerSignInResult | null {
        try {
            const data = localStorageService.get(STORAGE_KEYS.USER);
            if (data && isCustomerSignInResult(data)) {
                return data;
            }
            if (data !== null) {
                console.error('Invalid user data format in localStorage');
                this.removeUser();
            }
            return null;
        } catch (error) {
            console.error('Failed to get user data from localStorage:', error);
            this.removeUser();
            return null;
        }
    },

    removeUser(): void {
        localStorageService.remove(STORAGE_KEYS.USER);
    },

    hasUser(): boolean {
        return localStorageService.has(STORAGE_KEYS.USER);
    },
};
