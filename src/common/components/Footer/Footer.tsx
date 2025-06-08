import { useState } from 'react';
import S from './Footer.module.scss';

export const Footer = () => {
    const [language, setLanguage] = useState('en');

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
    };

    return (
        <div className={S.footer}>
            <div className={S.topRow}>
                <ul>
                    <li>OUR CARE GUIDE</li>
                    <li>ABOUT US</li>
                    <li>DO X JEWERLY</li>
                    <li>
                        <div className={S.section}>
                            <select value={language} onChange={handleLanguageChange} className={S.languageSelect}>
                                <option value="en">EN</option>
                            </select>
                        </div>
                    </li>
                </ul>
            </div>

            <div className={S.bottomRow}>
                <ul>
                    <li>
                        <a
                            href="https://www.facebook.com/DoKraPhotography/"
                            className={S.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Facebook
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.instagram.com/do.jewellery/"
                            className={S.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                    </li>
                    <li>Snapchat</li>
                </ul>
            </div>
        </div>
    );
};
