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
import { BreadCrumbs } from '../../common/components/BreadCrumbs/BreadCrumbs';

export const App = () => {
    const dispatch = useAppDispatch();
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const appError = useAppSelector<AppError>(errorSelector);

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

    return (
        <div className="app">
            <Header />

            {appStatus === 'loading' && <LinearProgress color={'success'} sx={linearProgressStyles} />}

            <div className="main">
                <div className="content">
                    <BreadCrumbs />
                    <Outlet />
                </div>
            </div>
            <Footer />
            <ToastifyNotification />
        </div>
    );
};
