export function customSliceString(inputString: string, length: number): string {
    if (inputString.length > length) {
        return inputString.slice(0, length) + '...';
    }
    return inputString;
}
