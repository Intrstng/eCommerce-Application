import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import S from './SignInPage.module.scss';
import { SignInForm } from '../../../features/auth/ui/signin/SignInForm';

export const SignInPage = () => {
    return (
        <div>
            <div className={S.linksHeader}>
                <span className={S.signInLoginLink}>Login</span>
                <div className={S.linksBorder}></div>
                <NavLink className={S.signUpLoginLink} to={PATH.SIGNUP}>
                    Register
                </NavLink>
            </div>
            <SignInForm />
        </div>
    );
};
