import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { PAGES, PATH } from '../../enums';
import { STYLES } from './styles.breadCrumbs';
import { isValidUUID } from '../../utils/validate-uuid';
import { useAppSelector } from '../../hooks';
import { catalogProductSelector } from '../../../features/catalog/model/selectors/catalogSelector';
import type { FC } from 'react';

const BREAD_CRUMBS_NAMES: Record<string, PAGES> = {
    main: PAGES.MAIN,
    about: PAGES.ABOUT,
    cart: PAGES.CART,
    favorites: PAGES.FAVORITES,
    catalog: PAGES.CATALOG,
    product: PAGES.PRODUCT,
    articles: PAGES.ARTICLES,
    article: PAGES.ARTICLE,
    error: PAGES.ERROR,
    signin: PAGES.SIGNIN,
    signup: PAGES.SIGNUP,
    profile: PAGES.PROFILE,
    addresses: PAGES.ADDRESSES,
};

interface BreadCrumbsProps {
    articleTitle?: string;
}

export const BreadCrumbs: FC<BreadCrumbsProps> = ({ articleTitle }) => {
    const location = useLocation();
    const [searchParameters] = useSearchParams();
    const pathnames = location.pathname.split(PATH.PAGE_ROOT).filter(Boolean);
    const catalogProduct = useAppSelector(catalogProductSelector);

    const typeParameter = searchParameters.get('productType') || searchParameters.get('type');
    const isProductDetailPage =
        pathnames[0] === PAGES.PRODUCT.toLowerCase() && pathnames.length === 2 && isValidUUID(pathnames[1]);
    const productName = isProductDetailPage && catalogProduct.length === 1 ? catalogProduct[0].name.en : null;

    if (location.pathname === '/main' || location.pathname === '/') {
        return null;
    }

    const breadcrumbsContents: { display: string; to?: string }[] = [];

    breadcrumbsContents.push({ display: PAGES.MAIN, to: PATH.MAIN });

    const isOnCatalogRoute = location.pathname.startsWith(PATH.CATALOG);
    const isOnProductRoute = location.pathname.startsWith(PATH.PRODUCT.split(':')[0]);
    const isOnArticleRoute = location.pathname.startsWith(PATH.ARTICLES);

    if (isOnCatalogRoute || isOnProductRoute) {
        breadcrumbsContents.push({ display: PAGES.CATALOG, to: PATH.CATALOG });

        if (isProductDetailPage && catalogProduct.length === 1) {
            const productTypeFromProduct = catalogProduct[0].productType;
            if (productTypeFromProduct) {
                breadcrumbsContents.push({
                    display: productTypeFromProduct,
                    to: `${PATH.CATALOG}?productType=${productTypeFromProduct}`,
                });
            }
            const finalProductName = productName;
            if (finalProductName) {
                breadcrumbsContents.push({ display: finalProductName });
            }
        } else if (typeParameter) {
            breadcrumbsContents.push({ display: typeParameter });
        }
    } else if (isOnArticleRoute) {
        breadcrumbsContents.push({ display: PAGES.ARTICLES, to: PATH.ARTICLES });
        if (articleTitle) {
            breadcrumbsContents.push({ display: articleTitle });
        }
    } else {
        const lastSegment = pathnames.at(-1);
        if (lastSegment) {
            const displayName = BREAD_CRUMBS_NAMES[lastSegment] ?? lastSegment;
            breadcrumbsContents.push({ display: displayName });
        }
    }

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={STYLES.breadcrumbs}>
            {breadcrumbsContents.map((item, index) => {
                const isLast = index === breadcrumbsContents.length - 1;
                return item.to && !isLast ? (
                    <Link to={item.to} key={item.display}>
                        <Typography sx={STYLES.links}>{item.display}</Typography>
                    </Link>
                ) : (
                    <Typography
                        color="textPrimary"
                        sx={{
                            ...STYLES.links,
                            ...STYLES.lastPage,
                            ...(isLast ? { pointerEvents: 'none' } : {}),
                        }}
                        key={item.display}
                    >
                        {item.display}
                    </Typography>
                );
            })}
        </Breadcrumbs>
    );
};
