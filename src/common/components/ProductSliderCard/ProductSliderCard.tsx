import type { FC } from 'react';
import S from './ProductSliderCard.module.scss';
import noImage from '../../../assets/products/no-image.png';
import type { ProductSliderCardProps } from './interfaces';
import Box from '@mui/material/Box';
import { formatPrice } from '../../../features/catalog/utils/format-price';

export const ProductSliderCard: FC<ProductSliderCardProps> = ({ productItemData }) => {
    const currentFormattedPrice = formatPrice(productItemData.prices, 'EUR');

    return (
        <Box className={S.productCard}>
            <Box className={S.imageContainer}>
                <img className={S.image} src={productItemData.images[0] ?? noImage} alt={'Product item slide'} />
            </Box>
            <Box className={S.infoContainer}>
                <Box className={S.name}>{productItemData.name.en}</Box>
                <Box className={S.price}>{currentFormattedPrice}</Box>
            </Box>
        </Box>
    );
};
