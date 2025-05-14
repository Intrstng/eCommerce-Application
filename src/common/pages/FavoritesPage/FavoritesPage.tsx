import { useTranslation } from 'react-i18next';
import S from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
    const { t } = useTranslation();
    return <section className={S.favoritesContent}>{t('favoritesPage.emptyMessage')}</section>;
};
