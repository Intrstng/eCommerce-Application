import Typography from '@mui/material/Typography';
import { STYLES } from './styles.addressesPage';
import Box from '@mui/material/Box';

export const AddressesPage = () => {
    return (
        <Box>
            <Typography variant="h3" component="h3" sx={STYLES.addressesTitle}>
                Addresses
            </Typography>
        </Box>
    );
};
