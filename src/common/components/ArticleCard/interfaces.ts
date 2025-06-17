export interface ArticleItem {
    id?: string;
    title: string;
    summary: string;
    text?: string;
    picture: string;
}

export interface ArticleCardProps extends ArticleItem {
    className?: string;
}
