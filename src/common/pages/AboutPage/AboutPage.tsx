import S from './AboutPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';

export const AboutPage = () => {
    return (
        <Box className={S.aboutPageContent}>
            <BreadCrumbs />
            <section className={S.aboutContent}>Here will be information about us</section>
        </Box>
    );
};
