import S from './AboutPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const AboutPage = () => {
    return (
        <>
            <BreadCrumbs />
            <section className={S.aboutContent}>Here will be information about us</section>
        </>
    );
};
