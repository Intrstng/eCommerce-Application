import S from './FavoritesPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';

export const FavoritesPage = () => {
    return (
        <Box className={S.favoritesPageContent}>
            <BreadCrumbs />
            <section className={S.favoritesContent}>Here will be favorites items stored</section>
        </Box>
    );
};
