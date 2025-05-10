import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import S from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { authIsLoggedInSelector } from '../../../features/auth/model/selectors/authSelector';
import { authActions } from '../../../features/auth/model/slices/authSlice';

export const Header = () => {
    // or we can use useSearchParams() here;

    const isLoggedIn = useAppSelector<boolean>(authIsLoggedInSelector);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        // ToDo: Add Api request to logout logic
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
    };

    return (
        <div className={S.header}>
            <NavLink className={S.logo} to={PATH.MAIN}>
                Logo
            </NavLink>
            <div className={S.nav}>
                <NavLink to={`${PATH.CATALOG}?page=1&type=Earrings`}>Earrings</NavLink>
                <NavLink to={`${PATH.CATALOG}?page=1&type=Ring`}>Rings</NavLink>
                <NavLink to={`${PATH.CATALOG}?page=1&type=Brooch`}>Brooch</NavLink>
                {isLoggedIn ? (
                    <NavLink to={PATH.SIGNIN} onClick={handleLogout}>
                        Logout
                    </NavLink>
                ) : (
                    <NavLink to={PATH.SIGNIN}>Login</NavLink>
                )}
            </div>
        </div>
    );
};
