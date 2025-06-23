export type ArticleItem = {
    id?: string | undefined;
    title: string;
    summary: string;
    text?: string | undefined;
    picture: string;
};

export type ArticleCardType = ArticleItem & {
    className?: string;
};
