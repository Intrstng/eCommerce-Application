import type { ArticleItem } from '../../components/ArticleCard/interfaces';
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import { articlesContent } from '../../../assets/articles-data/articles-data';
import { NavLink, useParams } from 'react-router-dom';
import S from './Article.module.scss';
import { PATH } from '../../enums';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';

export const Article = () => {
    const { id } = useParams<{ id: string }>();

    const article: ArticleItem | undefined = articlesContent.find(article => article.id === id);

    if (!article) {
        return (
            <div>
                <h2>ArticleCard Not Found</h2>
                <p>Sorry, the article with ID "{id}" could not be found.</p>
            </div>
        );
    }

    return (
        <Box className={S.articleContainer}>
            <BreadCrumbs articleTitle={article.title} />
            <section className={S.articleWrapper}>
                <ArticleCard
                    className={S.articlesContent}
                    text={article.text ?? ''}
                    title={article.title}
                    picture={article.picture}
                    summary={article.summary}
                />
                <NavLink to={PATH.ARTICLES} className={S.backToArticlesLink}>
                    Back to articles
                </NavLink>
            </section>
        </Box>
    );
};
