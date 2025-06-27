import { Link } from 'react-router-dom';
import S from './Logo.module.scss';
import { PATH } from '../../enums';
import icons from '../../../assets/icons/icons';

export const Logo = () => {
    return (
        <Link to={PATH.PAGE_ROOT}>
            <icons.logo className={S.logo} />
        </Link>
    );
};
