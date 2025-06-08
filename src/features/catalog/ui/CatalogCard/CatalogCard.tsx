import type { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { CatalogItemProps } from './types';
import { CatalogCardSkeleton } from './CatalogCardSkeleton';
import { STYLES } from './styles.catalogCard';
import { Link } from 'react-router-dom';
import { formatPrice, formatPriceDiscount } from '../../utils/format-price';
import Box from '@mui/material/Box';
import { PRICE_STYLES } from '../../../../common/styles/price.styles';

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
                        <CardMedia
                            component="img"
                            src={image}
                            alt={title}
                            className="cardImage"
                            sx={STYLES.cardImage}
                        />
                        <CardContent sx={STYLES.cardContent}>
                            <Typography className="cardTitle" sx={STYLES.cardTitle}>
                                {title}
                            </Typography>
                            <Typography className="cardText" sx={STYLES.cardText}>
                                {description}
                            </Typography>

                            <Box sx={PRICE_STYLES.priceContent}>
                                {priceInfo.hasDiscount ? (
                                    <>
                                        <Typography sx={PRICE_STYLES.price}>{priceInfo.discounted}</Typography>
                                        <Box sx={PRICE_STYLES.oldPriceContent}>
                                            <Typography sx={PRICE_STYLES.oldPrice}>{priceInfo.original}</Typography>
                                            <Box sx={PRICE_STYLES.lineThrough} />
                                        </Box>
                                    </>
                                ) : (
                                    <Typography sx={PRICE_STYLES.price}>{priceInfo.original}</Typography>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Link>
            )}
        </>
    );
};
