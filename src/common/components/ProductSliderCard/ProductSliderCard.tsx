import type { FC } from 'react';
import S from './ProductSliderCard.module.scss';
import noImage from '../../../assets/products/no-image.png';
import type { ProductSliderCardProps } from './interfaces';
import Box from '@mui/material/Box';
import { formatPrice } from '../../../features/catalog/utils/format-price';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../enums';
import { customSliceString } from '../../utils/custom-slice-string';

const SLIDER_CARD_TITLE_LENGTH: number = 35;

export const ProductSliderCard: FC<ProductSliderCardProps> = ({ productItemData }) => {
    const navigate = useNavigate();
    const currentFormattedPrice = formatPrice(productItemData.prices, 'EUR');
    const cardClickHandler = () => {
        navigate(`${PATH.PRODUCT_MAIN}/${productItemData?.id ?? ''}`);
    };

    const cardTitle: string = customSliceString(productItemData.name.en, SLIDER_CARD_TITLE_LENGTH);

    return (
        <Box className={S.productCard} onClick={cardClickHandler}>
            <Box className={S.imageContainer}>
                <img className={S.image} src={productItemData.images[0] ?? noImage} alt={'Product item slide'} />
            </Box>
            <Box className={S.infoContainer}>
                <Box className={S.name}>{cardTitle}</Box>
                <Box className={S.price}>{currentFormattedPrice}</Box>
            </Box>
        </Box>
    );
};
