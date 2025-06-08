import './App.scss';
import { Outlet } from 'react-router-dom';
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
import { useLocation } from 'react-router-dom';
import { PATH } from '../../common/enums';

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

    const isMainPage = location.pathname === PATH.MAIN || location.pathname === '/';
    const contentClassName = `content ${isMainPage ? '' : 'contentWithMargin'}`;

    return (
        <Box className="app">
            <Header />

            {appStatus === 'loading' && <LinearProgress color={'success'} sx={linearProgressStyles} />}

            <Box className="main mainContainer">
                <Box className={contentClassName}>
                    <Outlet />
                </Box>
            </Box>
            <Footer />
            <ToastifyNotification />
        </Box>
    );
};
