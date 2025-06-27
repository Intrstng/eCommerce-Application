import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { EnvironmentKeys } from '../../enums';
import { getEnvironmentVariable } from '../get-environment-variable';
import { assertString } from '../assertion-functions';

vi.mock('../assertion-functions', () => ({
    assertString: vi.fn(),
}));

describe('Test getEnvironmentVariable function', () => {
    const originalEnv = { ...import.meta.env };

    beforeEach(() => {
        vi.stubEnv('VITE_CTP_PROJECT_KEY', 'project-key');
        vi.stubEnv('VITE_CTP_CLIENT_ID', 'client-id');
        vi.stubEnv('VITE_CTP_CLIENT_SECRET', 'client-secret');
        vi.stubEnv('VITE_CTP_AUTH_URL', 'auth-url');
        vi.stubEnv('VITE_CTP_API_URL', 'api-url');
        vi.stubEnv('VITE_CTP_SCOPES', 'scopes');
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should return the correct project key', () => {
        const result = getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY);
        expect(result).toBe('project-key');
    });

    it('should return the correct client ID', () => {
        const result = getEnvironmentVariable(EnvironmentKeys.CTP_CLIENT_ID);
        expect(result).toBe('client-id');
    });

    it('should return the correct client secret', () => {
        const result = getEnvironmentVariable(EnvironmentKeys.CTP_CLIENT_SECRET);
        expect(result).toBe('client-secret');
    });

    it('should return the correct auth URL', () => {
        const result = getEnvironmentVariable(EnvironmentKeys.CTP_AUTH_URL);
        expect(result).toBe('auth-url');
    });

    it('should return the correct API URL', () => {
        const result = getEnvironmentVariable(EnvironmentKeys.CTP_API_URL);
        expect(result).toBe('api-url');
    });

    it('should return the correct scopes', () => {
        const result = getEnvironmentVariable(EnvironmentKeys.CTP_SCOPES);
        expect(result).toBe('scopes');
    });

    it('should throw an error for an unknown environment variable', () => {
        expect(() => getEnvironmentVariable('UNKNOWN_KEY' as EnvironmentKeys)).toThrow(TypeError);
    });

    it('should call assertString with the correct parameters', () => {
        const name = EnvironmentKeys.CTP_PROJECT_KEY;
        const value = import.meta.env.VITE_CTP_PROJECT_KEY;

        getEnvironmentVariable(name);

        expect(assertString).toHaveBeenCalledWith(value, name);
    });
});
