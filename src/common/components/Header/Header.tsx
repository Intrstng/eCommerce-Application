import { useTranslation } from 'react-i18next';
import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import S from './Header.module.scss';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import { Logo } from '../Logo/Logo';
import { SignInButton } from '../SignInButton/SignInButton';
import { SignUpButton } from '../SignUpButton/SignUpButton';

export const Header = () => {
    const { t, i18n } = useTranslation();
    // or we can use useSearchParams() here;
    // const isLoggedIn = useAppSelector<boolean>(authIsLoggedInSelector);

    const handleLanguageChange = async (lng: string) => {
        try {
            await i18n.changeLanguage(lng);
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };

    return (
        <div className={S.header}>
            <Logo />
            <div className={S.nav}>
                <NavLink to={`${PATH.CATALOG}?page=1&type=Earrings`} className={S.navLink}>
                    {t('header.earrings')}
                </NavLink>
                <NavLink to={`${PATH.CATALOG}?page=1&type=Ring`} className={S.navLink}>
                    {t('header.rings')}
                </NavLink>
                <NavLink to={`${PATH.CATALOG}?page=1&type=Brooch`} className={S.navLink}>
                    {t('header.brooch')}
                </NavLink>
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
                    <SignUpButton />
                </div>
            </div>
            <LogoutButton />
            <div className={S.languageButtons}>
                <button onClick={() => handleLanguageChange('en')}>EN</button>
                <button onClick={() => handleLanguageChange('ru')}>RU</button>
            </div>
        </div>
    );
};
