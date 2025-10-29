import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en/translation.json'
import de from './locales/de/translation.json'
import ro from './locales/ro/translation.json'

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      ro: { translation: ro }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18next
