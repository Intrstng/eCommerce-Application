import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { PATH } from '../enums';
import { App } from 'app/ui/App';
import { Error404 } from '../pages/Error404/Error404';
import { MainPage } from '../pages/MainPage/MainPage';
import { SignupPage } from '../pages/SignupPage/SignupPage';
import { ProfilePage } from '../pages/Protected/ProfilePage/ProfilePage';
import { AddressesPage } from '../pages/Protected/AddressesPage/AddressesPage';
import { ArticlesPage } from '../pages/ArticlesPage/ArticlesPage';
import { Article } from '../pages/Article/Article';
import { AboutPage } from '../pages/AboutPage/AboutPage';
import { CartPage } from '../pages/CartPage/CartPage';
import { FavoritesPage } from '../pages/FavoritesPage/FavoritesPage';
import { CatalogPage } from '../pages/CatalogPage/CatalogPage';
import type React from 'react';
import { SigninPage } from '../pages/SigninPage/SigninPage';

const isAuth = false; // Temporary solution

const PrivateRoutes = () => {
    return isAuth ? <Outlet /> : <Navigate to={PATH.SIGNIN} />;
};

const PublicRouteRedirect = ({ children }: { children: React.ReactNode }) => {
    return isAuth ? <Navigate to={PATH.MAIN} /> : <>{children}</>;
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
    // {
    //   path: PATH.PRODUCT,
    //   element: <ProductPage/>,
    // },
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
                <SigninPage />
            </PublicRouteRedirect>
        ),
    },
    {
        path: PATH.SIGNUP,
        element: (
            <PublicRouteRedirect>
                <SignupPage />
            </PublicRouteRedirect>
        ),
    },
];

const privateRoutes: RouteObject[] = [
    {
        path: PATH.PROFILE,
        element: <ProfilePage />,
    },
    {
        path: PATH.ADDRESSES,
        element: <AddressesPage />,
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
