import { useTranslation } from 'react-i18next';
import S from './Footer.module.scss';

export const Footer = () => {
    const { t } = useTranslation();
    return <div className={S.footer}>{t('footer.description')}</div>;
};
