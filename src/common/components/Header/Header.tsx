import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import S from './Header.module.scss';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import { Logo } from '../Logo/Logo';
import { SignInButton } from '../SignInButton/SignInButton';
import { SignUpButton } from '../SignUpButton/SignUpButton';
import { authAPI } from 'src/features/auth/api/authApi';
import { authTokenService } from '../../services/auth-token.service';

export const Header = () => {
    const handleCategoryClick = async (categoryType: string) => {
        try {
            await authTokenService.getAnonymousToken();

            const products = await authAPI.getProductsByCategory(categoryType);
            console.log(`Products for category ${categoryType}:`, products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div className={S.header}>
            <Logo />
            <div className={S.nav}>
                <NavLink
                    to={`${PATH.CATALOG}?page=1&type=Earrings`}
                    className={S.navLink}
                    onClick={() => handleCategoryClick('earrings')}
                >
                    Earrings
                </NavLink>
                <NavLink
                    to={`${PATH.CATALOG}?page=1&type=Ring`}
                    className={S.navLink}
                    onClick={() => handleCategoryClick('rings')}
                >
                    Rings
                </NavLink>
                <NavLink
                    to={`${PATH.CATALOG}?page=1&type=Brooch`}
                    className={S.navLink}
                    onClick={() => handleCategoryClick('brooches')}
                >
                    Brooches
                </NavLink>

                {/*Code below will be added in Sprint #3*/}

                {/*{isLoggedIn ? (*/}
                {/*    <NavLink to={PATH.SIGNIN} onClick={handleLogout}>*/}
                {/*        Logout*/}
                {/*    </NavLink>*/}
                {/*) : (*/}
                {/*    <NavLink to={PATH.SIGNIN}>Login</NavLink>*/}
                {/*)}*/}
                {/*<NavLink to={PATH.SIGNIN} className={isLoggedIn && S.authLinkDisabled}>*/}
                {/*    Login*/}
                {/*</NavLink>*/}
                <div className={S.authButtons}>
                    <SignInButton />
                    <div className={S.divider}></div>
                    <SignUpButton />
                </div>
            </div>
            <LogoutButton />
        </div>
    );
};
