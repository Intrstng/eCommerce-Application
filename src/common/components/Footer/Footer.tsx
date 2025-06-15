import S from './Footer.module.scss';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../enums';

export const Footer = () => {
    return (
        <div className={S.footer}>
            <div className={S.topRow}>
                <ul>
                    <NavLink to={PATH.AUTHOR} className={S.navFooterLink}>
                        <li>ABOUT AUTHOR</li>
                    </NavLink>
                    <NavLink to={PATH.ARTICLES} className={S.navFooterLink}>
                        <li>BLOG</li>
                    </NavLink>
                    <NavLink to={`${PATH.ARTICLES}/care-guide`} className={S.navFooterLink}>
                        <li>CARE GUIDE</li>
                    </NavLink>
                </ul>
            </div>

            <div className={S.bottomRow}>
                <ul>
                    <li>
                        <a
                            href="https://www.instagram.com/do.jewelry/"
                            className={S.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.threads.com/@k.dorozhko?xmt=AQF0J9-FRlzR02FqiPu3Pf84PAh20QITCS7-MeZwU7mmWJw"
                            className={S.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Threads
                        </a>
                    </li>
                    {/*<li>About author</li>*/}
                </ul>
            </div>
        </div>
    );
};
