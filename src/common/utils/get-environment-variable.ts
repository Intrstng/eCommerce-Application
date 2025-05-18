import { assertString } from './assertion-functions';

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
