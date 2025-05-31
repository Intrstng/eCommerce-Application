import { NavLink } from 'react-router-dom';
import { PATH } from '../../enums';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { STYLES } from './styles.signInButton';
import loginSvg from '../../../assets/logo/login.svg';
import { LoggedInButton } from '../LoggedInButton/LoggedInButton';
import { CardMedia } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { authIsLoggedInSelector } from '../../../features/auth/model/selectors/authSelector';

export const SignInButton = () => {
    const isLoggedIn = useAppSelector<boolean>(authIsLoggedInSelector);

    return (
        <Box sx={STYLES.signInBtn}>
          {isLoggedIn ? <LoggedInButton/>
                      : <Tooltip title="Login">
                            <NavLink to={PATH.SIGNIN}>
                              <CardMedia
                                  component="img"
                                  src={loginSvg}
                                  alt="Login"
                                  sx={STYLES.authLink}
                              />
                            </NavLink>
                        </Tooltip>}
        </Box>
    );
};
