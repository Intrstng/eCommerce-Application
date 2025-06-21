import S from './ArticleCard.module.scss';
import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import type { FC } from 'react';
import type { ArticleCardProps } from './interfaces';

export const ArticleCard: FC<ArticleCardProps> = ({ id, title, summary, text, picture, className }) => {
    const articleCardStyles = className ?? S.articleContent;

    return (
        <article className={articleCardStyles}>
            <img src={picture} alt={title} className={S.articleImage} />
            <h3>{title}</h3>
            {text ? <div className={S.articleText} dangerouslySetInnerHTML={{ __html: text }} /> : <p>{summary}</p>}
            {id && <NavLink to={`${PATH.ARTICLES}/${id}`}>Read More...</NavLink>}
        </article>
    );
};
