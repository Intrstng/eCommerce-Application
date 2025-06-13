import Skeleton from '@mui/material/Skeleton';
import S from './CartPage.module.scss';
import Box from '@mui/material/Box';

export const CartItemSkeleton = () => {
    return (
        <Box className={S.cartItemSkeletonContainer}>
            <Skeleton variant="rectangular" width={100} height={100} className={S.cartItemImage} />
            <Box className={S.skeletonContent}>
                <Skeleton variant="text" width="35%" />
                <Skeleton variant="text" width="20%" height={50} />
                <Skeleton variant="text" width="20%" />
                <Skeleton variant="text" width="40%" />
            </Box>
        </Box>
    );
};
