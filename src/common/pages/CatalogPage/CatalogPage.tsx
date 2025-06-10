import { Catalog } from '../../../features/catalog/ui/Catalog';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';
import { STYLES } from './styles.CatalogPage';

export const CatalogPage = () => {
    return (
        <Box sx={STYLES.catalogContent}>
            <BreadCrumbs />
            <Catalog />
        </Box>
    );
};
