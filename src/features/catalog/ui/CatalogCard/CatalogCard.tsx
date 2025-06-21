import type { FC } from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { CatalogItemProps } from './interfaces';
import { CatalogCardSkeleton } from './CatalogCardSkeleton';
import { STYLES } from './styles.catalogCard';
import { Link } from 'react-router-dom';
import { formatPrice, formatPriceDiscount } from '../../utils/format-price';
import Box from '@mui/material/Box';
import { PRICE_STYLES } from '../../../../common/styles/price.styles';
import noImage from '../../../../assets/products/no-image.png';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../../../common/hooks';
import { cartSelector } from '../../../cart/model/selectors/cartSelectors.ts';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { AddToCartIcon } from '../../../../common/components/AddToCartIcon/AddToCartIcon';

export const CatalogCard: FC<CatalogItemProps> = ({
    id,
    image,
    title,
    prices = [],
    description,
    isProductsLoading,
    isToCartLoading,
    variantId,
}) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const cart = useAppSelector<Cart | null>(cartSelector);
    const cartLineItems: LineItem[] = cart?.lineItems || [];

    const handleImageLoad = () => {
        setIsImageLoading(false);
        setImageError(false);
    };

    const handleImageError = () => {
        setIsImageLoading(false);
        setImageError(true);
    };

    const priceInfo = {
        original: formatPrice(prices, 'EUR'),
        discounted: formatPriceDiscount(prices, 'EUR'),
        hasDiscount: !!formatPriceDiscount(prices, 'EUR'),
    };

    const isInCart = cartLineItems.some(item => item.productId === id && item.variant.id === variantId);
    const currentLineItem = cartLineItems.find(item => item.productId === id && item.variant.id === variantId);

    return (
        <>
            {isProductsLoading ? (
                <CatalogCardSkeleton />
            ) : (
                <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
                    <Card sx={STYLES.card}>
                        {priceInfo.hasDiscount && (
                            <Box sx={STYLES.specialOfferBadge}>
                                <Typography sx={STYLES.specialOfferText}>Special Offer</Typography>
                            </Box>
                        )}
                        {isImageLoading && !imageError && (
                            <Box
                                sx={{
                                    ...STYLES.cardImage,
                                    ...STYLES.cardImageLoading,
                                }}
                            >
                                <CircularProgress color="inherit" size={40} />
                            </Box>
                        )}
                        {imageError ? (
                            <Box sx={STYLES.cardImageContainer}>
                                <CardMedia
                                    component="img"
                                    src={noImage}
                                    alt={title}
                                    className="cardImage" // Don`t delete
                                    sx={STYLES.cardImage}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                />
                                <AddToCartIcon
                                    currentLineItem={currentLineItem}
                                    id={id}
                                    isInCart={isInCart}
                                    variantId={variantId}
                                    isToCartLoading={isToCartLoading}
                                />
                            </Box>
                        ) : (
                            <Box sx={STYLES.cardImageContainer}>
                                <CardMedia
                                    component="img"
                                    src={image}
                                    alt={title}
                                    className="cardImage" // Don`t delete
                                    sx={{
                                        ...STYLES.cardImage,
                                        display: isImageLoading ? 'none' : 'block',
                                    }}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                />
                                <AddToCartIcon
                                    currentLineItem={currentLineItem}
                                    id={id}
                                    isInCart={isInCart}
                                    variantId={variantId}
                                    isToCartLoading={isToCartLoading}
                                />
                            </Box>
                        )}
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
