import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import S from './Header.module.scss';
import { useState } from 'react';

export const Header = () => {
    // or we can use useSearchParams() here;
    const [isLogged, setIsLogged] = useState(false); // ToDo: Temporary solution

    const handleLogout = () => {
        // ToDo: Add Api request to logout logic
        setIsLogged(false);
    };

    return (
        <div className={S.header}>
            <NavLink className={S.logo} to={PATH.MAIN}>
                Logo
            </NavLink>
            <div className={S.nav}>
                <NavLink to={`${PATH.CATALOG}?page=1&type=Barrete`}>Barrete</NavLink>
                <NavLink to={`${PATH.CATALOG}?page=1&type=Ring`}>Rings</NavLink>
                <NavLink to={`${PATH.CATALOG}?page=1&type=Brooch`}>Brooch</NavLink>
                {isLogged ? (
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
