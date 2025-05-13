import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { STYLES } from './styles.authFormLink';
import type { FC } from 'react';

const StyledNavLink = styled(NavLink)(() => ({
    // styled(NavLink)(({theme})
    ...STYLES.navLink,
}));

export const AuthFormLink: FC<AuthFormLinkProps> = ({ message, path, title }) => {
    return (
        <Typography variant="subtitle2" sx={STYLES.authLink}>
            {message}
            <StyledNavLink to={path}>{title}</StyledNavLink>
        </Typography>
    );
};

export type AuthFormLinkProps = {
    message: string;
    path: string;
    title: string;
};
