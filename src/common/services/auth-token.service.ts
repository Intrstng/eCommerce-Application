import { projectKey, clientId, clientSecret, baseAuthUrl, scopes } from '../api/commercetools-config';
import { isTokenResponse, isErrorResponse } from '../utils/type-guards';
import type { TokenResponse } from '../types';

let currentTokenData: TokenResponse | null = null;
let tokenRefreshPromise: Promise<TokenResponse> | null = null;

const formattedScopes = scopes.join(' ');

async function handleTokenResponse(response: Response): Promise<TokenResponse> {
    const data: unknown = await response.json();

    if (!response.ok) {
        if (isErrorResponse(data)) {
            const errorMessage = data.error_description ?? data.message ?? 'Request failed';
            throw new Error(errorMessage);
        }
        throw new Error('Request failed');
    }

    if (!isTokenResponse(data)) {
        throw new Error('Invalid token response format');
    }

    return data;
}

export const authTokenService = {
    setTokenData(tokenData: TokenResponse | null) {
        currentTokenData = tokenData;
    },

    getAccessToken(): string | null {
        return currentTokenData?.access_token ?? null;
    },

    async refreshTokenIfNeeded(): Promise<string | null> {
        if (!currentTokenData) {
            return null;
        }

        const expirationThreshold = 300 * 1000;
        const tokenExpiresAt = Date.now() + currentTokenData.expires_in * 1000;
        const isExpiringSoon = tokenExpiresAt < Date.now() + expirationThreshold;

        if (isExpiringSoon && currentTokenData.refresh_token) {
            if (tokenRefreshPromise) {
                const refreshedToken = await tokenRefreshPromise;
                return refreshedToken.access_token;
            }

            tokenRefreshPromise = this.refreshToken();
            try {
                const refreshedToken = await tokenRefreshPromise;
                return refreshedToken.access_token;
            } finally {
                tokenRefreshPromise = null;
            }
        }

        return currentTokenData.access_token;
    },

    async refreshToken(): Promise<TokenResponse> {
        if (!currentTokenData?.refresh_token) {
            throw new Error('No refresh token available');
        }

        const response = await fetch(`${baseAuthUrl}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: currentTokenData.refresh_token,
                scope: formattedScopes,
            }),
        });

        const tokenData = await handleTokenResponse(response);
        this.setTokenData(tokenData);
        return tokenData;
    },

    async getAnonymousToken(): Promise<TokenResponse> {
        const response = await fetch(`${baseAuthUrl}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                scope: formattedScopes,
            }),
        });

        const tokenData = await handleTokenResponse(response);
        this.setTokenData(tokenData);
        return tokenData;
    },

    async getCustomerToken(email: string, password: string): Promise<TokenResponse> {
        const response = await fetch(`${baseAuthUrl}/oauth/${projectKey}/customers/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
            body: new URLSearchParams({
                grant_type: 'password',
                username: email,
                password: password,
                scope: formattedScopes,
            }),
        });

        const tokenData = await handleTokenResponse(response);
        this.setTokenData(tokenData);
        return tokenData;
    },

    clearTokens() {
        currentTokenData = null;
        tokenRefreshPromise = null;
    },
};
