import { NavLink } from 'react-router-dom';
import { PATH } from '../../enums';
import { useAppSelector } from '../../hooks';
import Tooltip from '@mui/material/Tooltip';
import { authIsLoggedInSelector } from '../../../features/auth/model/selectors/authSelector';
import Box from '@mui/material/Box';
import { STYLES } from './styles.signInButton';
import loginSvg from '../../../assets/logo/login.svg';
import S from './SignInButton.module.scss';

export const SignInButton = () => {
    const isLoggedIn = useAppSelector<boolean>(authIsLoggedInSelector);

    return (
        <Box sx={STYLES.signInBtn}>
            <Tooltip title="Login">
                <NavLink to={PATH.SIGNIN}>
                    <img
                        src={loginSvg}
                        alt="Login"
                        className={`${S.authButton} ${isLoggedIn ? S.authLinkDisabled : ''}`}
                    />
                </NavLink>
            </Tooltip>
        </Box>
    );
};
