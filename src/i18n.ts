import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

// Parse URL for language suffix
const pathname = window.location.pathname;
const isZh = pathname.endsWith('/zh') || pathname.endsWith('/zh/');

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
    },
    lng: isZh ? 'zh' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
