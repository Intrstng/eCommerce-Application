import type { InitOptions } from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const i18nOptions: InitOptions = {
    fallbackLng: 'en',
    debug: true,
    interpolation: {
        escapeValue: false,
    },
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
        caches: ['cookie'],
    },
};

export const i18nInitPromise = i18n.use(HttpBackend).use(LanguageDetector).use(initReactI18next).init(i18nOptions);

export { default } from 'i18next';
