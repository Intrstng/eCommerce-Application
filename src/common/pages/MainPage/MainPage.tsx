import S from './MainPage.module.scss';
import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../hooks';
import { authIsLoggedInSelector } from '../../../features/auth/model/selectors/authSelector';
import SignUpStyles from '../../../common/components/SignUpButton/SignUpButton.module.scss';
import { errorNotifyMessage, successNotifyMessage, warningNotifyMessage } from '../../utils/notify-message';
import Button from '@mui/material/Button';
import { getEnvironmentVariable } from '../../api/commercetools';

const notifySuccess = () => {
    // Will be removed later
    successNotifyMessage('Some success toastify message');
};
const notifyWarning = () => {
    // Will be removed later
    warningNotifyMessage('Some warning toastify message');
};
const notifyError = () => {
    // Will be removed later
    errorNotifyMessage('Some error toastify message');
};

const notifyEnvironments = () => {
    // const projectKey = getEnvironmentVariable('VITE_CTP_PROJECT_KEY');
    // const clientId = getEnvironmentVariable('VITE_CTP_CLIENT_ID');
    // const clientSecret = getEnvironmentVariable('VITE_CTP_CLIENT_SECRET');
    // const authUrl = getEnvironmentVariable('VITE_CTP_AUTH_URL');
    // const apiUrl = getEnvironmentVariable('VITE_CTP_API_URL');

    // successNotifyMessage(`Envs:\n
    // ${projectKey}\n
    // ${clientId}\n
    // ${clientSecret}\n
    // ${authUrl}\n
    // ${apiUrl}`);
    successNotifyMessage('Some test message');
};

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
            <div className={S.mainControls}>
                <p>Examples of messages:</p>
                <Button onClick={notifySuccess}>Show Success Message</Button>
                <Button onClick={notifyWarning}>Show Warning Message</Button>
                <Button onClick={notifyError}>Show Error Message</Button>
                <p>Temporary check:</p>
                <Button onClick={notifyEnvironments}>Environment variables</Button>
            </div>
        </div>
    );
};
