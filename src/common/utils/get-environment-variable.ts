import { assertString } from './assertion-functions';
import { EnvironmentKeys } from '../enums';

export function getEnvironmentVariable(name: EnvironmentKeys): string {
    let value: unknown;
    switch (name) {
        case EnvironmentKeys.CTP_PROJECT_KEY: {
            value = import.meta.env.VITE_CTP_PROJECT_KEY;
            break;
        }
        case EnvironmentKeys.CTP_CLIENT_ID: {
            value = import.meta.env.VITE_CTP_CLIENT_ID;
            break;
        }
        case EnvironmentKeys.CTP_CLIENT_SECRET: {
            value = import.meta.env.VITE_CTP_CLIENT_SECRET;
            break;
        }
        case EnvironmentKeys.CTP_AUTH_URL: {
            value = import.meta.env.VITE_CTP_AUTH_URL;
            break;
        }
        case EnvironmentKeys.CTP_API_URL: {
            value = import.meta.env.VITE_CTP_API_URL;
            break;
        }
        case EnvironmentKeys.CTP_SCOPES: {
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
