import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
import { PAGES, PATH } from '../../enums';
import { STYLES } from './styles.breadCrumbs';
import { isValidUUID } from '../../utils/validate-uuid';

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

export const BreadCrumbs = () => {
    const location = useLocation();
    const [searchParameters] = useSearchParams();
    const pathnames = location.pathname.split(PATH.PAGE_ROOT).filter(Boolean);

    const typeParameter = searchParameters.get('type');

    if (location.pathname === '/main' || location.pathname === '/') {
        return null;
    }
    const isParameterUUIDInURL = pathnames.some(pathname => isValidUUID(pathname));

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={STYLES.breadcrumbs}>
            <Link to={PATH.MAIN}>
                <Typography sx={STYLES.links}>{PAGES.MAIN}</Typography>
            </Link>
            {pathnames.map((pathname, index) => {
                const routeTo = `${PATH.PAGE_ROOT}${pathnames.slice(0, index + 1).join(PATH.PAGE_ROOT)}`;
                const displayName = BREAD_CRUMBS_NAMES[pathname] ?? pathname;
                const isLastPage = index === pathnames.length - 1;
                const isPathnameUUID = isValidUUID(pathname);

                if (!isParameterUUIDInURL) {
                    return (
                        <Link to={routeTo} key={routeTo}>
                            <Typography
                                color="textPrimary"
                                sx={{
                                    ...STYLES.links,
                                    ...(!typeParameter && isLastPage ? STYLES.lastPage : {}),
                                }}
                            >
                                {displayName}
                            </Typography>
                        </Link>
                    );
                } else if (isParameterUUIDInURL && !isPathnameUUID) {
                    return (
                        <Typography
                            color="textPrimary"
                            sx={{
                                ...STYLES.links,
                                ...(!typeParameter && isLastPage ? STYLES.lastPage : {}),
                                ...STYLES.lastPage,
                            }}
                        >
                            {displayName}
                        </Typography>
                    );
                } else if (isParameterUUIDInURL && isPathnameUUID) {
                    return null;
                }
            })}
            {typeParameter && (
                <Typography
                    color="textPrimary"
                    sx={{
                        ...STYLES.links,
                        ...STYLES.parameterPath,
                        ...STYLES.lastPage,
                    }}
                >
                    {typeParameter}
                </Typography>
            )}
        </Breadcrumbs>
    );
};
