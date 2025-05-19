import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { getEnvironmentVariable } from '../utils/get-environment-variable';
import { getScopesArray } from '../utils/scope-utilities';
import { EnvironmentKeys } from '../enums';

if (!import.meta.env.VITE_CTP_PROJECT_KEY) {
    throw new Error(`${EnvironmentKeys.CTP_PROJECT_KEY} is not defined`);
}

export const projectKey = getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY);
const clientId = getEnvironmentVariable(EnvironmentKeys.CTP_CLIENT_ID);
const clientSecret = getEnvironmentVariable(EnvironmentKeys.CTP_CLIENT_SECRET);
const authUrl = getEnvironmentVariable(EnvironmentKeys.CTP_AUTH_URL);
const apiUrl = getEnvironmentVariable(EnvironmentKeys.CTP_API_URL);

const defaultScope = `manage_project:${projectKey}`;
const scopes = import.meta.env.VITE_CTP_SCOPES
    ? getScopesArray(getEnvironmentVariable(EnvironmentKeys.CTP_SCOPES))
    : [defaultScope];

const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: {
        clientId,
        clientSecret,
    },
    scopes,
    httpClient: fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiUrl,
    httpClient: fetch,
};

const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient);
