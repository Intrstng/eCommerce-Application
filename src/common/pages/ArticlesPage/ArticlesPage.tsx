import S from './ArticlesPage.module.scss';
import type { ArticleItem } from '../../components/ArticleCard/types';
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import { articlesContent } from '../../../assets/articles-data/articles-data';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';

export const ArticlesPage = () => {
    return (
        <Box className={S.articlesContainer}>
            <BreadCrumbs />
            <section className={S.articles}>
                <h2>Jewelry Articles</h2>
                <div className={S.articlesContent}>
                    {articlesContent.map((article: ArticleItem) => (
                        <ArticleCard
                            key={article.id}
                            id={article.id}
                            title={article.title}
                            summary={article.summary}
                            picture={article.picture}
                        />
                    ))}
                </div>
            </section>
        </Box>
    );
};
