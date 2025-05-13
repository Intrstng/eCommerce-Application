import S from './ArticleCard.module.scss';
import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import type { ArticleCardType } from './types';
import type { FC } from 'react';

export const ArticleCard: FC<ArticleCardType> = ({ id, title, summary, text, picture, className }) => {
    const articleCardStyles = className ?? S.articleContent;

    return (
        <article className={articleCardStyles}>
            <img src={picture} alt={title} className={S.articleImage} />
            <h3>{title}</h3>
            {text ? <p>{text}</p> : <p>{summary}</p>}
            {id && <NavLink to={`${PATH.ARTICLES}/${id}`}>Read More...</NavLink>}
        </article>
    );
};
