import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export function getEnvironmentVariable(name: keyof ImportMetaEnvironment): string {
    let value: unknown;
    switch (name) {
        case 'VITE_CTP_PROJECT_KEY': {
            value = import.meta.env.VITE_CTP_PROJECT_KEY;
            break;
        }
        case 'VITE_CTP_CLIENT_ID': {
            value = import.meta.env.VITE_CTP_CLIENT_ID;
            break;
        }
        case 'VITE_CTP_CLIENT_SECRET': {
            value = import.meta.env.VITE_CTP_CLIENT_SECRET;
            break;
        }
        case 'VITE_CTP_AUTH_URL': {
            value = import.meta.env.VITE_CTP_AUTH_URL;
            break;
        }
        case 'VITE_CTP_API_URL': {
            value = import.meta.env.VITE_CTP_API_URL;
            break;
        }
        case 'VITE_CTP_SCOPES': {
            value = import.meta.env.VITE_CTP_SCOPES;
            break;
        }
        default: {
            throw new TypeError(`Unknown environment variable: ${String(name)}`);
        }
    }
    assertString(value, name);
    return value;
}

function assertString(value: unknown, name: string): asserts value is string {
    if (typeof value !== 'string') {
        throw new TypeError(`${name} must be a string, got ${typeof value}`);
    }
}

function getScopesArray(scopesString: string): string[] {
    return scopesString
        .split(' ')
        .filter((scope): scope is string => typeof scope === 'string' && scope.length > 0)
        .map(scope => `${scope}:${projectKey}`);
}

if (!import.meta.env.VITE_CTP_PROJECT_KEY) {
    throw new Error('VITE_CTP_PROJECT_KEY is not defined');
}

const projectKey = getEnvironmentVariable('VITE_CTP_PROJECT_KEY');
const clientId = getEnvironmentVariable('VITE_CTP_CLIENT_ID');
const clientSecret = getEnvironmentVariable('VITE_CTP_CLIENT_SECRET');
const authUrl = getEnvironmentVariable('VITE_CTP_AUTH_URL');
const apiUrl = getEnvironmentVariable('VITE_CTP_API_URL');

const defaultScope = `manage_project:${projectKey}`;
const scopes = import.meta.env.VITE_CTP_SCOPES
    ? getScopesArray(getEnvironmentVariable('VITE_CTP_SCOPES'))
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
