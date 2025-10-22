import { createI18n } from 'vue-i18n';
import yaml from 'js-yaml';
import { locales } from '/@/config.yaml';

const VITE_LOCALES_URL = '/locales';

const LOADED = [];

const i18n = createI18n({
  legacy: false,
  locale: locales.default,
  fallbackLocale: locales.default,
});

export const setLocale = async locale => {
  try {
    if (!locales.supported.includes(locale)) throw new Error(`${locale} is not supported`);
    if (!LOADED.includes(locale)) {
      const url = `${VITE_LOCALES_URL}/${locale}.yaml`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error loading ${locale} from ${VITE_LOCALES_URL}`);
      const dictionary = yaml.load(await response.text());
      i18n.global.setLocaleMessage(locale, dictionary);
      LOADED.push(locale);
    }
    i18n.global.locale.value = locale;
    document.querySelector('html').setAttribute('lang', locale);
  } catch (error) { /* Send to Sentry? */ }
};

setLocale(locales.default);

export default i18n;
