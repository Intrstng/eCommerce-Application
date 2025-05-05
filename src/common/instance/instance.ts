import axios from 'axios';

/**
 * Reusable Axios instance
 * ToDo: add config to reusable Axios instance
 */
export const instance = axios.create({
    baseURL: 'https://.../',
    withCredentials: true,
    headers: {
        'API-KEY': '.....',
    },
});
