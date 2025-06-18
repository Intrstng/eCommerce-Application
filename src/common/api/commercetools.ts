// import {
//     ClientBuilder,
//     type AuthMiddlewareOptions,
//     type HttpMiddlewareOptions,
//     type TokenStore,
// } from '@commercetools/ts-client';
// import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// import { projectKey, clientId, clientSecret, authUrl, apiUrl, scopes } from './commercetools-config';
// import { EnvironmentKeys } from '../enums';
// import { authTokenService } from '../services/auth-token.service';
//
// if (!import.meta.env.VITE_CTP_PROJECT_KEY) {
//     throw new Error(`${EnvironmentKeys.CTP_PROJECT_KEY} is not defined`);
// }
//
// const authMiddlewareOptions: AuthMiddlewareOptions = {
//     host: authUrl,
//     projectKey,
//     credentials: {
//         clientId,
//         clientSecret,
//     },
//     scopes,
//     httpClient: fetch,
//     tokenCache: {
//         get: (): TokenStore => {
//             const tokenData = authTokenService.getTokenData();
//             const token = tokenData?.access_token;
//             const expirationTime = tokenData ? Date.now() + tokenData.expires_in * 1000 : Date.now();
//
//             if (!token) {
//                 authTokenService
//                     .ensureAnonymousToken()
//                     .then(() => {
//                         const newTokenData = authTokenService.getTokenData();
//                         return {
//                             token: newTokenData?.access_token ?? '',
//                             expirationTime: newTokenData ? Date.now() + newTokenData.expires_in * 1000 : Date.now(),
//                         };
//                     })
//                     .catch((error: unknown) => {
//                         console.error(
//                             'Failed to get anonymous token:',
//                             error instanceof Error ? error.message : String(error)
//                         );
//                         return {
//                             token: '',
//                             expirationTime: Date.now(),
//                         };
//                     });
//             }
//
//             return {
//                 token: token ?? '',
//                 expirationTime: expirationTime,
//             };
//         },
//         set: () => {
//             // Token is managed by authTokenService
//         },
//     },
// };
//
// const httpMiddlewareOptions: HttpMiddlewareOptions = {
//     host: apiUrl,
//     httpClient: fetch,
// };
//
// const ctpClient = new ClientBuilder()
//     .withClientCredentialsFlow(authMiddlewareOptions)
//     .withHttpMiddleware(httpMiddlewareOptions)
//     .withLoggerMiddleware()
//     .build();
//
// export const apiRoot = createApiBuilderFromCtpClient(ctpClient);

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
        get: (): TokenStore => {
            const tokenData = authTokenService.getTokenData();
            const token = tokenData?.access_token;
            const expirationTime = tokenData ? Date.now() + tokenData.expires_in * 1000 : Date.now();

            if (!token) {
                authTokenService
                    .ensureAnonymousToken()
                    .then(() => {
                        const newTokenData = authTokenService.getTokenData();
                        return {
                            token: newTokenData?.access_token ?? '',
                            expirationTime: newTokenData ? Date.now() + newTokenData.expires_in * 1000 : Date.now(),
                        };
                    })
                    .catch((error: unknown) => {
                        console.error(
                            'Failed to get anonymous token:',
                            error instanceof Error ? error.message : String(error)
                        );
                        return {
                            token: '',
                            expirationTime: Date.now(),
                        };
                    });
            }

            return {
                token: token ?? '',
                expirationTime: expirationTime,
            };
        },
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
