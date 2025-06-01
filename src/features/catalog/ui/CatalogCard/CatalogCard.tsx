import type { FC } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import type { CatalogItemProps } from './types';
import { CatalogCardSkeleton } from './CatalogCardSkeleton';
import { STYLES } from './styles.catalogCard';
import { Link } from 'react-router-dom';
import { formatPrice, formatPriceDiscount } from '../../utils/format-price';
import Box from '@mui/material/Box';

export const CatalogCard: FC<CatalogItemProps> = ({
    id,
    image,
    title,
    prices = [],
    description,
    isProductsLoading,
}) => {
    const priceInfo = {
        original: formatPrice(prices, 'EUR'),
        discounted: formatPriceDiscount(prices, 'EUR'),
        hasDiscount: !!formatPriceDiscount(prices, 'EUR'),
    };

    return (
        <>
            {isProductsLoading ? (
                <CatalogCardSkeleton />
            ) : (
                <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
                    <Card sx={STYLES.card}>
                        <CardMedia component="img" src={image} alt={title} sx={STYLES.cardImage} />
                        <CardContent sx={STYLES.cardContent}>
                            <Typography variant="h3" sx={STYLES.cardTitle}>
                                {title}
                            </Typography>
                            <Typography variant="body2" sx={STYLES.cardText}>
                                {description}
                            </Typography>

                            <Box sx={STYLES.priceBlock}>
                                {priceInfo.hasDiscount ? (
                                    <>
                                        <Typography
                                            sx={{
                                                ...STYLES.cardPrice,
                                                ...STYLES.discountPrice,
                                            }}
                                        >
                                            {priceInfo.discounted}
                                        </Typography>
                                        <Typography sx={STYLES.oldPrice}>{priceInfo.original}</Typography>
                                    </>
                                ) : (
                                    <Typography sx={STYLES.cardPrice}>{priceInfo.original}</Typography>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Link>
            )}
        </>
    );
};
