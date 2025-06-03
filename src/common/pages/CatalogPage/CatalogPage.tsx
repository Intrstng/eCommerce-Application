import { Catalog } from '../../../features/catalog/ui/Catalog';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import S from './CatalogPage.module.scss';
import Box from '@mui/material/Box';

export const CatalogPage = () => {
    return (
        <Box className={S.catalogContent}>
            <BreadCrumbs />
            <Catalog />
        </Box>
    );
};
