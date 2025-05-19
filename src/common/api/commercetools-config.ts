import { getEnvironmentVariable } from '../utils/get-environment-variable';
import { getScopesArray } from '../utils/scope-utilities';
import { EnvironmentKeys } from '../enums';

export const projectKey = getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY);
export const clientId = getEnvironmentVariable(EnvironmentKeys.CTP_CLIENT_ID);
export const clientSecret = getEnvironmentVariable(EnvironmentKeys.CTP_CLIENT_SECRET);
export const authUrl = getEnvironmentVariable(EnvironmentKeys.CTP_AUTH_URL);
export const apiUrl = getEnvironmentVariable(EnvironmentKeys.CTP_API_URL);

const defaultScope = `manage_project:${projectKey}`;
export const scopes = import.meta.env.VITE_CTP_SCOPES
    ? getScopesArray(getEnvironmentVariable(EnvironmentKeys.CTP_SCOPES))
    : [defaultScope];

export const baseAuthUrl = authUrl.endsWith('/') ? authUrl.slice(0, -1) : authUrl;
