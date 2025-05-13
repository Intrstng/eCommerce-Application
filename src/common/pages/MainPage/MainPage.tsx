import { useTranslation } from 'react-i18next';
import S from './MainPage.module.scss';
import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../hooks';
import { authIsLoggedInSelector } from '../../../features/auth/model/selectors/authSelector';
import SignUpStyles from '../../../common/components/SignUpButton/SignUpButton.module.scss';
import { errorNotifyMessage, successNotifyMessage, warningNotifyMessage } from '../../utils/notify-message';
import Button from '@mui/material/Button';

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

export const MainPage = () => {
    const { t } = useTranslation();
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
                    <NavLink to={PATH.CATALOG}>{t('mainPage.catalog')}</NavLink>
                    <NavLink to={PATH.ARTICLES}>{t('mainPage.articles')}</NavLink>
                    <NavLink to={PATH.ABOUT}>{t('mainPage.about')}</NavLink>
                    <NavLink to={PATH.CART}>{t('mainPage.cart')}</NavLink>
                    <NavLink to={PATH.FAVORITES}>{t('mainPage.favorites')}</NavLink>
                </div>

                <div className={S.mainNavBlock}>
                    <Typography component="h2" variant="h5">
                        {t('mainPage.authLinks')}
                    </Typography>
                    <NavLink to={PATH.SIGNIN} className={isLoggedIn ? SignUpStyles.authLinkDisabled : ''}>
                        {t('mainPage.login')}
                    </NavLink>
                    <NavLink to={PATH.SIGNUP} className={isLoggedIn ? SignUpStyles.authLinkDisabled : ''}>
                        {t('mainPage.register')}
                    </NavLink>
                </div>

                <div className={S.mainNavBlock}>
                    <Typography component="h2" variant="h5">
                        {t('mainPage.protectedRoutes')}
                    </Typography>
                    <NavLink to={PATH.PROFILE}>{t('mainPage.profile')}</NavLink>
                    <NavLink to={PATH.ADDRESSES}>{t('mainPage.addresses')}</NavLink>
                </div>
            </div>
            <div className={S.mainControls}>
                <p>Examples of messages:</p>
                <Button onClick={notifySuccess}>{t('mainPage.successMessage')}</Button>
                <Button onClick={notifyWarning}>{t('mainPage.warningMessage')}</Button>
                <Button onClick={notifyError}>{t('mainPage.errorMessage')}</Button>
            </div>
        </div>
    );
};
