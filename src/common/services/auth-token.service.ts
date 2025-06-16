// import { projectKey, clientId, clientSecret, baseAuthUrl, scopes } from '../api/commercetools-config';
// import { isTokenResponse, isErrorResponse } from '../utils/type-guards';
// import type { TokenResponse } from '../types';
// import { cookieService } from './cookie.service';
//
// const TOKEN_COOKIE_NAME = 'LC-auth-token';
// const REFRESH_TOKEN_COOKIE_NAME = 'LC-refresh-token';
// const TOKEN_EXPIRY_COOKIE_NAME = 'LC-expiry-token';
//
// const MILLISECONDS_IN_SECOND = 1000;
// const SECONDS_IN_MINUTE = 60;
// const MINUTES_IN_HOUR = 60;
// const HOURS_IN_DAY = 24;
//
// const TOKEN_EXPIRATION_BUFFER = 5 * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
// const REFRESH_TOKEN_EXPIRY_DAYS = 30;
// const REFRESH_TOKEN_EXPIRY_SECONDS = REFRESH_TOKEN_EXPIRY_DAYS * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
//
// let currentTokenData: TokenResponse | null = null;
// let tokenRefreshPromise: Promise<TokenResponse> | null = null;
//
// const formattedScopes = scopes.join(' ');
//
// function saveTokenToCookies(tokenData: TokenResponse) {
//     const expiresIn = tokenData.expires_in;
//     const expiryDate = new Date();
//     expiryDate.setTime(expiryDate.getTime() + expiresIn * MILLISECONDS_IN_SECOND);
//
//     cookieService.set(TOKEN_COOKIE_NAME, tokenData.access_token, {
//         expires: expiresIn,
//         path: '/',
//         secure: true,
//         sameSite: 'Strict',
//     });
//
//     cookieService.set(REFRESH_TOKEN_COOKIE_NAME, tokenData.refresh_token, {
//         expires: REFRESH_TOKEN_EXPIRY_SECONDS,
//         path: '/',
//         secure: true,
//         sameSite: 'Strict',
//     });
//
//     cookieService.set(TOKEN_EXPIRY_COOKIE_NAME, expiryDate.toISOString(), {
//         expires: expiresIn,
//         path: '/',
//         secure: true,
//         sameSite: 'Strict',
//     });
// }
//
// function loadTokenFromCookies(): TokenResponse | null {
//     const accessToken = cookieService.get(TOKEN_COOKIE_NAME);
//     const refreshToken = cookieService.get(REFRESH_TOKEN_COOKIE_NAME);
//     const expiryDate = cookieService.get(TOKEN_EXPIRY_COOKIE_NAME);
//
//     if (!accessToken || !refreshToken || !expiryDate) {
//         return null;
//     }
//
//     const expiresIn = Math.floor((new Date(expiryDate).getTime() - Date.now()) / MILLISECONDS_IN_SECOND);
//     if (expiresIn <= 0) {
//         clearTokenCookies();
//         return null;
//     }
//
//     return {
//         access_token: accessToken,
//         refresh_token: refreshToken,
//         expires_in: expiresIn,
//         scope: formattedScopes,
//         token_type: 'Bearer',
//     };
// }
//
// function clearTokenCookies() {
//     cookieService.remove(TOKEN_COOKIE_NAME, '/');
//     cookieService.remove(REFRESH_TOKEN_COOKIE_NAME, '/');
//     cookieService.remove(TOKEN_EXPIRY_COOKIE_NAME, '/');
// }
//
// async function handleTokenResponse(response: Response): Promise<TokenResponse> {
//     const data: unknown = await response.json();
//
//     if (!response.ok) {
//         if (isErrorResponse(data)) {
//             const errorMessage = data.error_description ?? data.message ?? 'Request failed';
//             throw new Error(errorMessage);
//         }
//         throw new Error('Request failed');
//     }
//
//     if (!isTokenResponse(data)) {
//         throw new Error('Invalid token response format');
//     }
//
//     return data;
// }
//
// export const authTokenService = {
//     setTokenData(tokenData: TokenResponse | null) {
//         currentTokenData = tokenData;
//         if (tokenData) {
//             saveTokenToCookies(tokenData);
//         } else {
//             clearTokenCookies();
//         }
//     },
//
//     getAccessToken(): string | null {
//         currentTokenData ??= loadTokenFromCookies();
//         return currentTokenData?.access_token ?? null;
//     },
//
//     async refreshTokenIfNeeded(): Promise<string | null> {
//         if (!currentTokenData) {
//             currentTokenData = loadTokenFromCookies();
//             if (!currentTokenData) {
//                 return null;
//             }
//         }
//
//         const expirationThreshold = TOKEN_EXPIRATION_BUFFER;
//         const tokenExpiresAt = Date.now() + currentTokenData.expires_in * MILLISECONDS_IN_SECOND;
//         const isExpiringSoon = tokenExpiresAt < Date.now() + expirationThreshold;
//
//         if (isExpiringSoon && currentTokenData.refresh_token) {
//             if (tokenRefreshPromise) {
//                 const refreshedToken = await tokenRefreshPromise;
//                 return refreshedToken.access_token;
//             }
//
//             tokenRefreshPromise = this.refreshToken();
//             try {
//                 const refreshedToken = await tokenRefreshPromise;
//                 return refreshedToken.access_token;
//             } finally {
//                 tokenRefreshPromise = null;
//             }
//         }
//
//         return currentTokenData.access_token;
//     },
//
//     async refreshToken(): Promise<TokenResponse> {
//         if (!currentTokenData?.refresh_token) {
//             throw new Error('No refresh token available');
//         }
//
//         const response = await fetch(`${baseAuthUrl}/oauth/token`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
//             },
//             body: new URLSearchParams({
//                 grant_type: 'refresh_token',
//                 refresh_token: currentTokenData.refresh_token,
//                 scope: formattedScopes,
//             }),
//         });
//
//         const tokenData = await handleTokenResponse(response);
//         this.setTokenData(tokenData);
//         return tokenData;
//     },
//
//     async getAnonymousToken(): Promise<TokenResponse> {
//         const response = await fetch(`${baseAuthUrl}/oauth/${projectKey}/anonymous/token`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
//             },
//             body: new URLSearchParams({
//                 grant_type: 'client_credentials',
//                 scope: formattedScopes,
//             }),
//         });
//
//         const tokenData = await handleTokenResponse(response);
//         this.setTokenData(tokenData);
//         return tokenData;
//     },
//
//     async getCustomerToken(email: string, password: string): Promise<TokenResponse> {
//         const response = await fetch(`${baseAuthUrl}/oauth/${projectKey}/customers/token`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
//             },
//             body: new URLSearchParams({
//                 grant_type: 'password',
//                 username: email,
//                 password: password,
//                 scope: formattedScopes,
//             }),
//         });
//
//         const tokenData = await handleTokenResponse(response);
//         this.setTokenData(tokenData);
//         return tokenData;
//     },
//
//     clearTokens() {
//         currentTokenData = null;
//         tokenRefreshPromise = null;
//         clearTokenCookies();
//     },
//
//     async ensureAnonymousToken(): Promise<void> {
//         const token = this.getAccessToken();
//         if (token) return;
//         await this.getAnonymousToken();
//     },
// };

// Added
import { projectKey, clientId, clientSecret, baseAuthUrl, scopes } from '../api/commercetools-config';
import { isTokenResponse, isErrorResponse } from '../utils/type-guards';
import type { TokenResponse } from '../types';
import { cookieService } from './cookie.service';

const TOKEN_COOKIE_NAME = 'LC-auth-token';
const REFRESH_TOKEN_COOKIE_NAME = 'LC-refresh-token';
const TOKEN_EXPIRY_COOKIE_NAME = 'LC-expiry-token';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const TOKEN_EXPIRATION_BUFFER = 5 * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
const REFRESH_TOKEN_EXPIRY_DAYS = 30;
const REFRESH_TOKEN_EXPIRY_SECONDS = REFRESH_TOKEN_EXPIRY_DAYS * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE;

let currentTokenData: TokenResponse | null = null;
let tokenRefreshPromise: Promise<TokenResponse> | null = null;

const formattedScopes = scopes.join(' ');

function saveTokenToCookies(tokenData: TokenResponse) {
    const expiresIn = tokenData.expires_in;
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + expiresIn * MILLISECONDS_IN_SECOND);

    cookieService.set(TOKEN_COOKIE_NAME, tokenData.access_token, {
        expires: expiresIn,
        path: '/',
        secure: true,
        sameSite: 'Strict',
    });

    cookieService.set(REFRESH_TOKEN_COOKIE_NAME, tokenData.refresh_token, {
        expires: REFRESH_TOKEN_EXPIRY_SECONDS,
        path: '/',
        secure: true,
        sameSite: 'Strict',
    });

    cookieService.set(TOKEN_EXPIRY_COOKIE_NAME, expiryDate.toISOString(), {
        expires: expiresIn,
        path: '/',
        secure: true,
        sameSite: 'Strict',
    });
}

function loadTokenFromCookies(): TokenResponse | null {
    const accessToken = cookieService.get(TOKEN_COOKIE_NAME);
    const refreshToken = cookieService.get(REFRESH_TOKEN_COOKIE_NAME);
    const expiryDate = cookieService.get(TOKEN_EXPIRY_COOKIE_NAME);

    if (!accessToken || !refreshToken || !expiryDate) {
        return null;
    }

    const expiresIn = Math.floor((new Date(expiryDate).getTime() - Date.now()) / MILLISECONDS_IN_SECOND);
    if (expiresIn <= 0) {
        clearTokenCookies();
        return null;
    }

    return {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
        scope: formattedScopes,
        token_type: 'Bearer',
    };
}

function clearTokenCookies() {
    cookieService.remove(TOKEN_COOKIE_NAME, '/');
    cookieService.remove(REFRESH_TOKEN_COOKIE_NAME, '/');
    cookieService.remove(TOKEN_EXPIRY_COOKIE_NAME, '/');
}

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
        if (tokenData) {
            saveTokenToCookies(tokenData);
        } else {
            clearTokenCookies();
        }
    },

    getAccessToken(): string | null {
        currentTokenData ??= loadTokenFromCookies();
        return currentTokenData?.access_token ?? null;
    },

    getTokenData(): TokenResponse | null {
        currentTokenData ??= loadTokenFromCookies();
        return currentTokenData;
    },

    async refreshTokenIfNeeded(): Promise<string | null> {
        if (!currentTokenData) {
            currentTokenData = loadTokenFromCookies();
            if (!currentTokenData) {
                return null;
            }
        }

        const expirationThreshold = TOKEN_EXPIRATION_BUFFER;
        const tokenExpiresAt = Date.now() + currentTokenData.expires_in * MILLISECONDS_IN_SECOND;
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
        const response = await fetch(`${baseAuthUrl}/oauth/${projectKey}/anonymous/token`, {
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
        clearTokenCookies();
    },

    async ensureAnonymousToken(): Promise<void> {
        const token = this.getAccessToken();
        if (token) return;
        await this.getAnonymousToken();
    },
};
