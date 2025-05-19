/// <reference types="vite/client" />
import type { EnvironmentKeys } from './common/enums';

type ImportMetaEnvironment = {
    readonly VITE_CTP_PROJECT_KEY: EnvironmentKeys.CTP_PROJECT_KEY;
    readonly VITE_CTP_CLIENT_ID: EnvironmentKeys.CTP_CLIENT_ID;
    readonly VITE_CTP_CLIENT_SECRET: EnvironmentKeys.CTP_CLIENT_SECRET;
    readonly VITE_CTP_API_URL: EnvironmentKeys.CTP_API_URL;
    readonly VITE_CTP_AUTH_URL: EnvironmentKeys.CTP_AUTH_URL;
    readonly VITE_CTP_SCOPES: EnvironmentKeys.CTP_SCOPES;
};

type ImportMeta = {
    readonly env: ImportMetaEnvironment;
};
