export function generateRandomArrayItems<T>(items: T[], count: number): T[] {
    if (count <= 0) return [];
    if (count >= items.length) return [...items];

    const arrayCopy = [...items];
    const result: T[] = [];

    for (let i = arrayCopy.length - 1; i >= 0 && result.length < count; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[randomIndex]] = [arrayCopy[randomIndex], arrayCopy[i]];
        result.push(arrayCopy[i]);
    }

    return result;
}
