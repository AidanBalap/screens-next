import { createI18n } from 'vue-i18n';
import { locales } from '/@/config.yaml';

// Import all locale files directly
import ca from './locales/ca.yaml';
import en from './locales/en.yaml';
import es from './locales/es.yaml';
import fr from './locales/fr.yaml';

const messages = {
  ca,
  en,
  es,
  fr,
};

const i18n = createI18n({
  legacy: false,
  locale: locales.default,
  fallbackLocale: locales.fallback,
  messages,
});

export const setLocale = locale => {
  try {
    if (!locales.supported.includes(locale)) {
      throw new Error(`${locale} is not supported`);
    }
    i18n.global.locale.value = locale;
    document.querySelector('html').setAttribute('lang', locale);
  } catch (error) {
    // Send to Sentry?
  }
};

// Initialize with default locale
setLocale(locales.default);

export default i18n;
