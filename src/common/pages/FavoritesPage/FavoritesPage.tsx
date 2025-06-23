import S from './FavoritesPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const FavoritesPage = () => {
    return (
        <>
            <BreadCrumbs />
            <section className={S.favoritesContent}>Here will be favorites items stored</section>
        </>
    );
};
