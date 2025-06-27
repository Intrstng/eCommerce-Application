import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import S from './SignUpPage.module.scss';
import { SignUpForm } from '../../../features/auth/ui/signup/SignUpForm';

export const SignUpPage = () => {
    return (
        <div>
            <div className={S.linksHeader}>
                <NavLink className={S.signInRegisterLink} to={PATH.SIGNIN}>
                    Login
                </NavLink>
                <div className={S.linksBorder}></div>
                <span className={S.signUpRegisterLink}>Register</span>
            </div>
            <SignUpForm />
        </div>
    );
};
