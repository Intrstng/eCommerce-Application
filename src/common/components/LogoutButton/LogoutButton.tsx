import { NavLink } from 'react-router-dom';
import { PATH } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOutTC } from '../../../features/auth/model/slices/authSlice';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import { authIsLoggedInSelector } from '../../../features/auth/model/selectors/authSelector';
import Box from '@mui/material/Box';
import { STYLES } from './styles.logoutButton';

export const LogoutButton = () => {
    const isLoggedIn = useAppSelector<boolean>(authIsLoggedInSelector);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logOutTC());
    };

    return (
        <Box sx={STYLES.logoutBtn}>
            {isLoggedIn && (
                <Tooltip title="Logout">
                    <NavLink to={PATH.SIGNIN}>
                        <IconButton onClick={handleLogout} aria-label="logout">
                            <LogoutIcon sx={STYLES.logoutIcon} />
                        </IconButton>
                    </NavLink>
                </Tooltip>
            )}
        </Box>
    );
};
