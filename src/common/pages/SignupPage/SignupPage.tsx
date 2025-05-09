import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import S from './SignupPage.module.scss';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';

export const SignupPage = () => {
    return (
        <div>
            <div className={S.linksHeader}>
                <NavLink className={S.signinRegisterLink} to={PATH.SIGNIN}>
                    Login
                </NavLink>
                <div className={S.linksBorder}></div>
                <span className={S.signupRegisterLink}>Register</span>
            </div>
            <SignUpForm />
        </div>
    );
};
