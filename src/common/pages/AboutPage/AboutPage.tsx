import { useTranslation } from 'react-i18next';
import S from './AboutPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const AboutPage = () => {
    const { t } = useTranslation();
    return (
        <>
            <BreadCrumbs />
            <section className={S.aboutContent}>{t('aboutPage.aboutContent')}</section>
        </>
    );
};
