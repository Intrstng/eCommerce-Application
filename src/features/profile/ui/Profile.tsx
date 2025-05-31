import S from './Profile.module.scss';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { STYLES } from './styles.profile';
import Divider from '@mui/material/Divider';
import { PATH } from '../../../common/enums';
import Typography from '@mui/material/Typography';

export const Profile = () => {
    const location = useLocation();
    const isProfilePage = location.pathname.endsWith(PATH.PROFILE) || location.pathname.endsWith(`${PATH.PROFILE}/`);

    return (
        <Box sx={STYLES.profileContent}>
            <NavLink
                to={PATH.PERSONAL_NESTED}
                className={({ isActive }) => `${S.navButton} ${isActive ? S.active : ''}`}
            >
                Personal info
            </NavLink>
            <NavLink
                to={PATH.PASSWORDS_NESTED}
                className={({ isActive }) => `${S.navButton} ${isActive ? S.active : ''}`}
            >
                Password
            </NavLink>
            <NavLink
                to={PATH.ADDRESS_NESTED}
                className={({ isActive }) => `${S.navButton} ${isActive ? S.active : ''}`}
            >
                Address
            </NavLink>
            <Divider sx={STYLES.devider} />
            {isProfilePage ? (
                <Typography variant="h3" component="h3" sx={STYLES.profileSubtitle}>
                    Please select a profile section...
                </Typography>
            ) : (
                <Outlet />
            )}
        </Box>
    );
};
