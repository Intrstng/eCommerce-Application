import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { STYLES } from './styles.catalogCard';

export const CatalogCardSkeleton = () => {
    return (
        <Card sx={STYLES.card}>
            <Skeleton variant="rectangular" width={370} height={370} />
            <CardContent sx={STYLES.cardContent}>
                <Typography
                    className="cardTitle"
                    sx={{
                        ...STYLES.cardFont,
                        ...STYLES.cardTitle,
                    }}
                >
                    <Skeleton width="80%" height={25} />
                </Typography>
                <Typography
                    className="cardText"
                    sx={{
                        ...STYLES.cardFont,
                        ...STYLES.cardText,
                    }}
                >
                    <Skeleton width="80%" height={35} />
                </Typography>
                <Typography
                    className="cardPrice"
                    sx={{
                        ...STYLES.cardFont,
                    }}
                >
                    <Skeleton width="40%" height={25} />
                </Typography>
            </CardContent>
        </Card>
    );
};
