import { getEnvironmentVariable } from '../utils/get-environment-variable';
import { getScopesArray } from '../utils/scope-utilities';

export const projectKey = getEnvironmentVariable('VITE_CTP_PROJECT_KEY');
export const clientId = getEnvironmentVariable('VITE_CTP_CLIENT_ID');
export const clientSecret = getEnvironmentVariable('VITE_CTP_CLIENT_SECRET');
export const authUrl = getEnvironmentVariable('VITE_CTP_AUTH_URL');
export const apiUrl = getEnvironmentVariable('VITE_CTP_API_URL');

const defaultScope = `manage_project:${projectKey}`;
export const scopes = import.meta.env.VITE_CTP_SCOPES
    ? getScopesArray(getEnvironmentVariable('VITE_CTP_SCOPES'))
    : [defaultScope];

export const baseAuthUrl = authUrl.endsWith('/') ? authUrl.slice(0, -1) : authUrl;
