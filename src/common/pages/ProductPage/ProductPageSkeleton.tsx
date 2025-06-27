import Box from '@mui/material/Box';
import { STYLES } from './styles.productPage';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';

export const ProductPageSkeleton = () => {
    return (
        <Box sx={STYLES.productSkeletonContainer}>
            <Card sx={STYLES.product}>
                <Box sx={STYLES.carousel}>
                    <Skeleton variant="rectangular" width={500} height={500} />
                </Box>

                <Box sx={STYLES.content}>
                    <Skeleton variant="text" width="20%" height={40} />
                    <Skeleton variant="text" width="80%" height={60} />
                    <Skeleton variant="text" width="30%" height={24} />
                    <Skeleton variant="text" width="30%" height={24} />
                    <Skeleton variant="text" width="30%" height={24} />
                    <Skeleton variant="text" width="100%" height={95} />
                    <Divider sx={STYLES.devider} />
                    <Skeleton variant="text" width="30%" height={24} />
                    <Box sx={STYLES.skeletonBlock}>
                        <Skeleton variant="text" width="90%" height={36} />
                        <Skeleton variant="text" width="5%" height={24} />
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};
