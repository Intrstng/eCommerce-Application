import S from './AuthorPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';

export const AuthorPage = () => {
    return (
        <Box className={S.authorPageContent}>
            <BreadCrumbs />
            <section className={S.authorContent}>Here will be information about author</section>
        </Box>
    );
};
