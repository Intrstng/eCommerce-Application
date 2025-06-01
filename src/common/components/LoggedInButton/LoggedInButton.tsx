import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, CardMedia, Popover } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import loggedSvg from '../../../assets/logo/logged.svg';
import { STYLES } from './styles.loggedInButton';
import Divider from '@mui/material/Divider';
import { PATH } from '../../enums';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import Button from '@mui/material/Button';

export const LoggedInButton = () => {
    const [anchorElement, setAnchorElement] = useState<HTMLElement | null | undefined>(null);
    const open = Boolean(anchorElement);

    const handleClick = (event: React.MouseEvent<HTMLElement> | null | undefined) => {
        setAnchorElement(event?.currentTarget ?? null);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    return (
        <Box>
            <Tooltip title="Logged">
                <CardMedia component="img" src={loggedSvg} alt="Logged" sx={STYLES.authButton} onClick={handleClick} />
            </Tooltip>

            <Popover
                open={open}
                anchorEl={anchorElement}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={STYLES.popover}
            >
                <Box sx={STYLES.popoverLinks}>
                    <NavLink to={PATH.PROFILE_MAIN} onClick={handleClose} style={STYLES.dashboardLink}>
                        <Button aria-label="Dashboard" sx={STYLES.dashboardBtn}>
                            Dashboard
                        </Button>
                    </NavLink>

                    <Divider sx={STYLES.devider} />

                    <LogoutButton onClickHandler={handleClose} />
                </Box>
            </Popover>
        </Box>
    );
};
