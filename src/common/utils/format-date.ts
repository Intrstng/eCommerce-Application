export function formatDateString(dateString?: string): string {
    if (!dateString) {
        return '';
    }
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        return '';
    }
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options).toUpperCase();
}
