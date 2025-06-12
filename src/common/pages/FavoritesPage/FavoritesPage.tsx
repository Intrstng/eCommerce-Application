import { useTranslation } from 'react-i18next';
import S from './FavoritesPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const FavoritesPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <BreadCrumbs />
            <section className={S.favoritesContent}>{t('favoritesPage.description')}</section>
        </>
    );
};
