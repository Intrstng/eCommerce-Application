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
import { useState } from 'react';
import noImage from '../../../../assets/products/no-image.png';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { addToCartTC, removeFromCartTC } from '../../../cart/model/slices/cartSlice.ts';
import icons from '../../../../assets/icons/icons';
import { cartLineItemsSelector } from '../../../cart/model/selectors/cartSelectors.ts';

export const CatalogCard: FC<CatalogItemProps> = ({
    id,
    image,
    title,
    prices = [],
    description,
    isProductsLoading,
    variantId,
}) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const dispatch = useAppDispatch();
    const cartLineItems = useAppSelector(cartLineItemsSelector);

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
                            <CardMedia
                                component="img"
                                src={noImage}
                                alt={title}
                                sx={STYLES.cardImage}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                            />
                        ) : (
                            <CardMedia
                                component="img"
                                src={image}
                                alt={title}
                                sx={{
                                    ...STYLES.cardImage,
                                    display: isImageLoading ? 'none' : 'block',
                                }}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                            />
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
                                <IconButton
                                    sx={{
                                        ...STYLES.addToCartButton,
                                        ...(isInCart && STYLES.inCartButton),
                                    }}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        if (isInCart && currentLineItem) {
                                            dispatch(removeFromCartTC(currentLineItem.id));
                                        } else {
                                            dispatch(addToCartTC(id, variantId));
                                        }
                                    }}
                                >
                                    <icons.basket />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Link>
            )}
        </>
    );
};
