import S from './ProductSliderCardSkeleton.module.scss';
import Box from '@mui/material/Box';

export const ProductSliderCardSkeleton = () => {
    return (
        <Box className={S.productCardSkeleton}>
            <Box className={S.imageSkeleton}></Box>
            <Box className={S.infoContainerSkeleton}>
                <Box className={S.nameSkeleton}></Box>
                <Box className={S.infoSkeleton}></Box>
                <Box className={S.priceSkeleton}></Box>
            </Box>
        </Box>
    );
};
