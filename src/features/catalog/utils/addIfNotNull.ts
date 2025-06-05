export const addIfNotNull = (value: string | null, queryCollection: string[]) => {
    if (value !== null && value !== '') {
        queryCollection.push(value);
    }
};
