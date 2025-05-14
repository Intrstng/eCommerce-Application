import { useTranslation } from 'react-i18next';
import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import S from './SignInPage.module.scss';
import { SignInForm } from '../../../features/auth/ui/signin/SignInForm';

export const SignInPage = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className={S.linksHeader}>
                <span className={S.signInLoginLink}>{t('signInPage.loginLink')}</span>
                <div className={S.linksBorder}></div>
                <NavLink className={S.signUpLoginLink} to={PATH.SIGNUP}>
                    {t('signInPage.signupLink')}
                </NavLink>
            </div>
            <SignInForm />
        </div>
    );
};
