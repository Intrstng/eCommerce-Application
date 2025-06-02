import type React from 'react';
import { useState } from 'react';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher: React.FC = () => {
    const [language, setLanguage] = useState('en');

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
        console.log('Language changed to:', event.target.value);
    };

    return (
        <div className={styles.languageSwitcher}>
            <select value={language} onChange={handleLanguageChange} className={styles.languageSelect}>
                <option value="en">EN</option>
                <option value="ru">RU</option>
            </select>
        </div>
    );
};
