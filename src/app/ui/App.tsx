import './App.scss';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Footer } from '../../common/components/Footer/Footer';
import { Header } from '../../common/components/Header/Header';
import { PATH } from '../../common/enums';
import { ToastifyNotification } from '../../common/components/ToastifyNotification/ToastifyNotification';

export const App = () => {
    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate(-1);
    };

    return (
        <div className="app">
            <Header />

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
