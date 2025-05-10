import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import S from './SigninPage.module.scss';
import { SignInForm } from '../../../features/auth/ui/signin/SignInForm';

export const SigninPage = () => {
    return (
        <div>
            <div className={S.linksHeader}>
                <span className={S.signinLoginLink}>Login</span>
                <div className={S.linksBorder}></div>
                <NavLink className={S.signupLoginLink} to={PATH.SIGNUP}>
                    Register
                </NavLink>
            </div>
            <SignInForm />
        </div>
    );
};
