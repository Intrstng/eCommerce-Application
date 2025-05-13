import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

if (!import.meta.env.VITE_CTP_PROJECT_KEY) {
    throw new Error('VITE_CTP_PROJECT_KEY is not defined');
}

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
const authUrl = import.meta.env.VITE_CTP_AUTH_URL;
const apiUrl = import.meta.env.VITE_CTP_API_URL;

const defaultScope = `manage_project:${projectKey}`;
const scopes = import.meta.env.VITE_CTP_SCOPES
    ? import.meta.env.VITE_CTP_SCOPES.split(' ')
          .filter(Boolean)
          .map((scope: string) => `${scope}:${projectKey}`)
    : [defaultScope];

const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: {
        clientId,
        clientSecret,
    },
    scopes,
    fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: apiUrl,
    fetch,
};

const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

export const apiRoot = createApiBuilderFromCtpClient(client);
