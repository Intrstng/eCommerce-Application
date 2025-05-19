export const cookieService = {
    set(
        name: string,
        value: string,
        options?: {
            expires?: Date | number;
            path?: string;
            domain?: string;
            secure?: boolean;
            sameSite?: 'Strict' | 'Lax' | 'None';
            httpOnly?: boolean;
        }
    ) {
        let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

        if (options?.expires) {
            const expiresDate =
                typeof options.expires === 'number' ? new Date(Date.now() + options.expires * 1000) : options.expires;
            cookie += `; expires=${expiresDate.toUTCString()}`;
        }

        if (options?.path) {
            cookie += `; path=${options.path}`;
        }

        if (options?.domain) {
            cookie += `; domain=${options.domain}`;
        }

        if (options?.secure === true) {
            cookie += '; secure';
        }

        if (options?.sameSite) {
            cookie += `; SameSite=${options.sameSite}`;
        }

        // eslint-disable-next-line unicorn/no-document-cookie
        document.cookie = cookie;
    },

    createCookieRegex(name: string): RegExp {
        const encodedName = encodeURIComponent(name);
        const specialChars = ['*', '+', '.', '-'];
        const escapedName = specialChars.reduce((string_, char) => string_.split(char).join(`\\${char}`), encodedName);
        return new RegExp(`(?:^|;\\s*)${escapedName}=([^;]*)`);
    },

    get(name: string): string | null {
        try {
            const matches = this.createCookieRegex(name).exec(document.cookie);
            return matches ? decodeURIComponent(matches[1]) : null;
        } catch {
            return null;
        }
    },

    remove(name: string, path?: string, domain?: string) {
        this.set(name, '', {
            expires: new Date(0),
            path,
            domain,
        });
    },
};
