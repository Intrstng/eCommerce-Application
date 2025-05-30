import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { PATH } from '../enums';
import { App } from 'app/ui/App';
import { Error404 } from '../pages/Error404/Error404';
import { MainPage } from '../pages/MainPage/MainPage';
import { SignUpPage } from '../pages/SignUpPage/SignUpPage';
import { ProfilePage } from '../pages/Protected/ProfilePage/ProfilePage';
import { AddressesPage } from '../pages/Protected/AddressesPage/AddressesPage';
import { ArticlesPage } from '../pages/ArticlesPage/ArticlesPage';
import { Article } from '../pages/Article/Article';
import { AboutPage } from '../pages/AboutPage/AboutPage';
import { CartPage } from '../pages/CartPage/CartPage';
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage';
import { CatalogPage } from '../pages/CatalogPage/CatalogPage';
import type React from 'react';
import { useAppSelector } from '../hooks';
import { authIsLoggedInSelector } from '../../features/auth/model/selectors/authSelector';
import { SignInPage } from '../pages/SignInPage/SignInPage';
import { ProductPage } from '../pages/ProductPage/ProductPage';
import { PasswordsPage } from '../pages/Protected/PasswordsPage/PasswordsPage';
import { PersonalInfoPage } from '../pages/Protected/PersonalInfoPage/PersonalInfoPage';

const PrivateRoutes = () => {
    const isLoggedIn = useAppSelector<boolean>(authIsLoggedInSelector);
    return isLoggedIn ? <Outlet /> : <Navigate to={PATH.SIGNIN} />;
};

const PublicRouteRedirect = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = useAppSelector<boolean>(authIsLoggedInSelector);
    return isLoggedIn ? <Navigate to={PATH.MAIN} /> : <>{children}</>;
};

const publicRoutes: RouteObject[] = [
    {
        path: PATH.MAIN,
        element: <MainPage />,
    },
    {
        path: PATH.CATALOG,
        element: <CatalogPage />,
    },
    {
        path: PATH.PRODUCT,
        element: <ProductPage />,
    },
    {
        path: PATH.ARTICLES,
        element: <ArticlesPage />,
    },
    {
        path: `${PATH.ARTICLES}/:id`,
        element: <Article />,
    },
    {
        path: PATH.ABOUT,
        element: <AboutPage />,
    },
    {
        path: PATH.CART,
        element: <CartPage />,
    },
    {
        path: PATH.FAVORITES,
        element: <FavoritesPage />,
    },
    {
        path: PATH.ERROR,
        element: <Error404 />,
    },
    {
        path: PATH.SIGNIN,
        element: (
            <PublicRouteRedirect>
                <SignInPage />
            </PublicRouteRedirect>
        ),
    },
    {
        path: PATH.SIGNUP,
        element: (
            <PublicRouteRedirect>
                <SignUpPage />
            </PublicRouteRedirect>
        ),
    },
];

const privateRoutes: RouteObject[] = [
    {
        path: PATH.PROFILE,
        element: <ProfilePage />,
        children: [
            {
                path: PATH.PERSONAL_NESTED,
                element: <PersonalInfoPage />,
            },
            {
                path: PATH.PASSWORDS_NESTED,
                element: <PasswordsPage />,
            },
            {
                path: PATH.ADDRESS_NESTED,
                element: <AddressesPage />,
            },
        ],
    },
];

export const router = createBrowserRouter(
    [
        {
            path: PATH.PAGE_ROOT,
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Navigate to={PATH.MAIN} />,
                },
                {
                    element: <PrivateRoutes />,
                    children: privateRoutes,
                },
                ...publicRoutes,
                {
                    path: PATH.CATCH_ALL,
                    element: <Error404 />,
                },
            ],
        },
    ],
    {
        future: {
            v7_relativeSplatPath: true,
        },
    }
);
