import { useTranslation } from 'react-i18next';
import S from './AboutPage.module.scss';

export const AboutPage = () => {
    const { t } = useTranslation();
    return <section className={S.aboutContent}>{t('aboutPage.description')}</section>;
};
