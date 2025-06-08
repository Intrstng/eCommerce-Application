import S from './Footer.module.scss';

export const Footer = () => {
    return (
        <div className={S.footer}>
            <div className={S.topRow}>
                <ul>
                    <li>CARE GUIDE</li>
                    <li>BLOG</li>
                    <li>ABOUT US</li>
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
