import './App.scss';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Footer } from '../../common/components/Footer/Footer';
import { Header } from '../../common/components/Header/Header';
import { PATH } from '../../common/enums';
import { ToastifyNotification } from '../../common/components/ToastifyNotification/ToastifyNotification';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import type { AppError, Status } from 'app/model/types';
import { errorSelector, statusSelector } from 'app/model/selectors/appSelectors';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect } from 'react';
import { errorNotifyMessageWithDispatch } from '../../common/utils/notify-message';

export const App = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const appError = useAppSelector<AppError>(errorSelector);

    const navigateHandler = () => {
        navigate(-1);
    };

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
                    <div className="horizontalNavigation">
                        <NavLink className="linkLikeButton" to={PATH.PAGE_ROOT}>
                            Home
                        </NavLink>
                        <button onClick={navigateHandler} className="buttonLikeLink">
                            Back
                        </button>
                    </div>
                    <Outlet />
                </div>
            </div>
            <Footer />
            <ToastifyNotification />
        </div>
    );
};
