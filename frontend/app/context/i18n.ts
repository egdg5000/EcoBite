import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

i18n
  .use(initReactI18next)
  .init({
    lng: Localization.locale, 
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          welcome: "Welcome!",
          logout: "Log out",
        },
      },
      nl: {
        translation: {
          welcome: "Welkom!",
          logout: "Uitloggen",
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
