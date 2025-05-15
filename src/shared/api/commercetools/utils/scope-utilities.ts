import { getEnvironmentVariable } from '../../commercetools';

/**
 * Converts a space-separated scopes string into an array of properly formatted scopes
 * with project key appended.
 * @param scopesString - Space-separated string of scopes
 * @returns Array of formatted scopes with project key
 */

export function getScopesArray(scopesString: string): string[] {
    const projectKey = getEnvironmentVariable('VITE_CTP_PROJECT_KEY');

    return scopesString
        .split(' ')
        .filter((scope): scope is string => typeof scope === 'string' && scope.length > 0)
        .map(scope => `${scope}:${projectKey}`);
}
