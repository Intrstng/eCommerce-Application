import type { FC } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import type { CatalogItemProps } from './types';
import { CatalogCardSkeleton } from './CatalogCardSkeleton';
import { STYLES } from './styles.catalogCard';
import { Link } from 'react-router-dom';
import { formatPrice, formatPriceDiscount, isFirstSignInIDOdd } from '../../utils/format-price';
import Box from '@mui/material/Box';

export const CatalogCard: FC<CatalogItemProps> = ({ id, image, title, prices, description, isProductsLoading }) => {
    const price: string = formatPrice(prices, 'EUR');

    return (
        <>
            {isProductsLoading ? (
                <CatalogCardSkeleton />
            ) : (
                <Link to={`/product/${id}`}>
                    <Card sx={STYLES.card}>
                        <CardMedia
                            component="img"
                            src={image}
                            alt="product"
                            className="cardImage"
                            sx={STYLES.cardImage}
                        />
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

                            <Box sx={STYLES.priceBlock}>
                                <Typography
                                    className="cardPrice"
                                    sx={{
                                        ...STYLES.cardFont,
                                        ...STYLES.cardPrice,
                                        ...(isFirstSignInIDOdd(id) ? STYLES.discountPrice : {}),
                                    }}
                                >
                                    {price}
                                </Typography>

                                {isFirstSignInIDOdd(id) && (
                                    <Box sx={STYLES.oldPriceContent}>
                                        <Typography sx={STYLES.oldPrice}>
                                            {formatPriceDiscount(prices, 'EUR')}
                                        </Typography>

                                        <Box sx={STYLES.lineThrough} />
                                    </Box>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Link>
            )}
        </>
    );
};
