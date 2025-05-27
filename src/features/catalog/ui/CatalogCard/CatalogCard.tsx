import type { FC } from 'react';
import S from './CatalogCard.module.scss';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import type { CatalogItemProps } from './types';

export const CatalogCard: FC<CatalogItemProps> = ({ image, title, price, description }) => {
    return (
        <Card className={S.card}>
            <CardMedia component="img" src={image} alt="master" className={S.card__image} />
            <CardContent>
                <Typography variant="h5" className={S.card__title}>
                    {title}
                </Typography>
                <Typography variant="body2" className={S.card__price}>
                    {price}
                </Typography>
                <Typography variant="body2" className={S.card__text}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};
