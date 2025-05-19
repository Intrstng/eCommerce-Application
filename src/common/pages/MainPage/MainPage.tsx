import S from './MainPage.module.scss';
import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../hooks';
import { authIsLoggedInSelector } from '../../../features/auth/model/selectors/authSelector';
import SignUpStyles from '../../../common/components/SignUpButton/SignUpButton.module.scss';
import { successNotifyMessage, warningNotifyMessage } from '../../utils/notify-message';

export const MainPage = () => {
    const isLoggedIn = useAppSelector<boolean>(authIsLoggedInSelector);

    return (
        <div className={S.mainContent}>
            <h2>Main Page</h2>
            <div className={S.mainArticles}>
                <p>Here will be rendered all articles of the main page</p>
            </div>
            <div className={S.mainNav}>
                <div className={S.mainNavBlock}>
                    <Typography component="h2" variant="h5">
                        Public routes:
                    </Typography>
                    <NavLink to={PATH.CATALOG}>Catalog</NavLink>
                    <NavLink to={PATH.ARTICLES}>Blog Articles</NavLink>
                    <NavLink to={PATH.ABOUT}>About us</NavLink>

                    <NavLink to={PATH.CART}>Cart for unauthorized user</NavLink>
                    <NavLink to={PATH.FAVORITES}>Favorites page for unauthorized user</NavLink>
                </div>

                <div className={S.mainNavBlock}>
                    <Typography component="h2" variant="h5">
                        Authorization links:
                    </Typography>
                    <NavLink to={PATH.SIGNIN} className={isLoggedIn ? SignUpStyles.authLinkDisabled : ''}>
                        Login page
                    </NavLink>
                    <NavLink to={PATH.SIGNUP} className={isLoggedIn ? SignUpStyles.authLinkDisabled : ''}>
                        Registration page
                    </NavLink>
                </div>

                <div className={S.mainNavBlock}>
                    <Typography component="h2" variant="h5">
                        Protected routes:
                    </Typography>
                    <NavLink to={PATH.PROFILE}>Authorized user profile page</NavLink>
                    <NavLink to={PATH.ADDRESSES}>Authorized user addresses page</NavLink>
                </div>
            </div>
        </div>
    );
};
