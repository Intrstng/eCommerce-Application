import { NavLink } from 'react-router-dom';
import { PATH } from '../../enums';
import { useAppSelector } from '../../hooks';
import Tooltip from '@mui/material/Tooltip';
import { authIsLoggedInSelector } from '../../../features/auth/model/selectors/authSelector';
import Box from '@mui/material/Box';
import { STYLES } from './styles.signUpButton';
import registerImg from '../../../assets/logo/register.png';
import S from './SignUpButton.module.scss';

export const SignUpButton = () => {
    const isLoggedIn = useAppSelector<boolean>(authIsLoggedInSelector);

    return (
        <Box sx={STYLES.signUpBtn}>
            <Tooltip title="Register">
                <NavLink to={PATH.SIGNUP}>
                    <img
                        src={registerImg}
                        alt="Register"
                        className={`${S.signUpIcon} ${S.authButton} ${isLoggedIn ? S.authLinkDisabled : ''}`}
                    />
                </NavLink>
            </Tooltip>
        </Box>
    );
};
