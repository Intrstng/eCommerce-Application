// import { useTranslation } from 'react-i18next';
// import styles from './Footer.module.scss';
//
// export const Footer = () => {
//     const { t } = useTranslation();
//     return (
//         <div className={styles.footer}>
//             <div className={styles.footerLinksMain}>
//                 <ul>
//                     <li
//                         onClick={() => {
//                             console.log('click AboutUS');
//                         }}
//                     >
//                         {t('footer.aboutUs')}
//                     </li>
//                     <li
//                         onClick={() => {
//                             console.log('click Footer');
//                         }}
//                     >
//                         Do X Jewerly
//                     </li>
//                 </ul>
//             </div>
//             <div className={styles.footerLinksAdditional}>
//                 <ul>
//                     <li>
//                         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//                             Facebook
//                         </a>
//                     </li>
//                     <li>
//                         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//                             Instagram
//                         </a>
//                     </li>
//                     <li>
//                         <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer">
//                             Snapchat
//                         </a>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// };

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
                                {/*<option value="ru">RU</option>*/}
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
