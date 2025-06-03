import './App.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../../common/components/Footer/Footer';
import { Header } from '../../common/components/Header/Header';
import { ToastifyNotification } from '../../common/components/ToastifyNotification/ToastifyNotification';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import type { AppError, Status } from 'app/model/types';
import { errorSelector, statusSelector } from 'app/model/selectors/appSelectors';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect } from 'react';
import { errorNotifyMessageWithDispatch } from '../../common/utils/notify-message';
import Box from '@mui/material/Box';

export const App = () => {
    const dispatch = useAppDispatch();
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const appError = useAppSelector<AppError>(errorSelector);
    const location = useLocation();

    useEffect(() => {
        if (typeof appError === 'string') {
            errorNotifyMessageWithDispatch(dispatch, appError);
        }
    }, [dispatch, appError]);

    const linearProgressStyles = {
        position: 'absolute',
        top: 76,
        left: 0,
        right: 0,
        zIndex: 5,
    };

    const isMainPage = location.pathname === '/' || location.pathname === '/main';

    const containerClasses = `main container ${!isMainPage ? 'container--padded' : ''}`;

    return (
        <Box className="app">
            <Header />

            {appStatus === 'loading' && <LinearProgress color={'success'} sx={linearProgressStyles} />}

            <Box className={containerClasses}>
                <Box className="content">
                    <Outlet />
                </Box>
            </Box>
            <Footer />
            <ToastifyNotification />
        </Box>
    );
};
