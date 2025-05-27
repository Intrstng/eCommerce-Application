import type { FC } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import type { CatalogItemProps } from './types';
import { CatalogCardSkeleton } from './CatalogCardSkeleton';
import { STYLES } from './styles.catalogCard';

export const CatalogCard: FC<CatalogItemProps> = ({ image, title, price, description, isProductsLoading }) => {
    return (
        <>
            {' '}
            {isProductsLoading ? (
                <CatalogCardSkeleton />
            ) : (
                <Card sx={STYLES.card}>
                    <CardMedia component="img" src={image} alt="product" className="cardImage" sx={STYLES.cardImage} />
                    <CardContent sx={STYLES.cardContent}>
                        <Typography
                            className="cardTitle"
                            sx={{
                                ...STYLES.cardFont,
                                ...STYLES.cardTitle,
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            className="cardText"
                            sx={{
                                ...STYLES.cardFont,
                                ...STYLES.cardText,
                            }}
                        >
                            {description}
                        </Typography>
                        <Typography
                            className="cardPrice"
                            sx={{
                                ...STYLES.cardFont,
                                ...STYLES.cardPrice,
                            }}
                        >
                            {price}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </>
    );
};
