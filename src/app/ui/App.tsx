import './App.scss';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Footer } from '../../common/components/Footer/Footer';
import { Header } from '../../common/components/Header/Header';
import { PATH } from '../../common/enums';
import { ToastifyNotification } from '../../common/components/ToastifyNotification/ToastifyNotification';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import type { AppError, Status } from 'app/model/types';
// import { useEffect } from 'react';
// import { initializeAppTC } from 'app/model/slices/appSlice';
import { errorSelector, statusSelector } from 'app/model/selectors/appSelectors';
// import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect } from 'react';
import { errorNotifyMessage } from '../../common/utils/notify-message';

export const App = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const appStatus = useAppSelector<Status>(statusSelector);
    const appError = useAppSelector<AppError>(errorSelector);
    // const isInitialized = useAppSelector<boolean>(isInitializedSelector)

    const navigateHandler = () => {
        navigate(-1);
    };

    // useEffect(() => {
    //   dispatch(initializeAppTC())
    // }, [])

    // if (!isInitialized) {
    //   return (
    //       <div className='loaderContainer'>
    //         <CircularProgress color='secondary' />
    //       </div>
    //   )
    // }

    useEffect(() => {
        if (typeof appError === 'string') {
            errorNotifyMessage(dispatch, appError);
        }
    }, [dispatch, appError]);

    const linearProgressStyles = {
        position: 'absolute',
        top: 76, // fix
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
