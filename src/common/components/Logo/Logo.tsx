import { NavLink } from 'react-router-dom';
import S from './Logo.module.scss';
import { PATH } from '../../enums';
import logoSvg from '../../../assets/logo/logo.svg';

export const Logo = () => {
    return (
        <NavLink className={S.logo} to={PATH.MAIN}>
            <img src={logoSvg} alt="Jewerly Logo" className={S.logoIcon} />
        </NavLink>
    );
};
