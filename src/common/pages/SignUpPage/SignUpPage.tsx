import { useTranslation } from 'react-i18next';
import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import S from './SignUpPage.module.scss';
import { SignUpForm } from '../../../features/auth/ui/signup/SignUpForm';

export const SignUpPage = () => {
    const { t } = useTranslation();
    return (
        <div>
            <div className={S.linksHeader}>
                <NavLink className={S.signInRegisterLink} to={PATH.SIGNIN}>
                    {t('signUpPage.loginLink')}
                </NavLink>
                <div className={S.linksBorder}></div>
                <span className={S.signUpRegisterLink}>{t('signUpPage.signupLink')}</span>
            </div>
            <SignUpForm />
        </div>
    );
};
