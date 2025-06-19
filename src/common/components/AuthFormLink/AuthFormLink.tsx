import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { STYLES } from './styles.authFormLink';
import S from './AuthFormLink.module.scss';
import type { FC } from 'react';
import type { AuthFormLinkProps } from './interfaces';

export const AuthFormLink: FC<AuthFormLinkProps> = ({ message, path, title }) => {
    return (
        <Typography variant="subtitle2" sx={STYLES.authLink}>
            {message}
            <NavLink to={path} className={S.navLink}>
                {title}
            </NavLink>
        </Typography>
    );
};
