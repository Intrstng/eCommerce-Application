export function replaceAllQuotes(string_: string): string {
    return string_.split('"').join('');
}
