import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../enums';
import { useAppDispatch } from '../../hooks';
import { logOutTC } from '../../../features/auth/model/slices/authSlice';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { STYLES } from './styles.logoutButton';
import Button from '@mui/material/Button';
import type { LogoutButtonProps } from './interfaces';

export const LogoutButton: FC<LogoutButtonProps> = ({ onClickHandler }) => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logOutTC());
        onClickHandler();
    };

    return (
        <Box sx={STYLES.logoutBtn}>
            <Tooltip title="Logout">
                <span>
                    <NavLink to={PATH.SIGNIN} style={STYLES.logoutLink}>
                        <Button onClick={handleLogout} aria-label="logout" sx={STYLES.logoutBtn}>
                            Logout
                        </Button>
                    </NavLink>
                </span>
            </Tooltip>
        </Box>
    );
};
