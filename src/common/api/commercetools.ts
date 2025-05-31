import {
    ClientBuilder,
    type AuthMiddlewareOptions,
    type HttpMiddlewareOptions,
    type TokenStore,
} from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { projectKey, clientId, clientSecret, authUrl, apiUrl, scopes } from './commercetools-config';
import { EnvironmentKeys } from '../enums';
import { authTokenService } from '../services/auth-token.service';

if (!import.meta.env.VITE_CTP_PROJECT_KEY) {
    throw new Error(`${EnvironmentKeys.CTP_PROJECT_KEY} is not defined`);
}

const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: {
        clientId,
        clientSecret,
    },
    scopes,
    httpClient: fetch,
    tokenCache: {
        get: (): TokenStore => ({
            token: authTokenService.getAccessToken() ?? '',
            expirationTime: Date.now(),
        }),
        set: () => {
            // Token is managed by authTokenService
        },
    },
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
