import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

export const LOCALE_COOKIE_NAME = 'locale';

export function initLocalization(messages: any, lang: string) {
    // import Backend from "i18next-http-backend";
    // import LanguageDetector from "i18next-browser-languagedetector";
    // don't want to use this?
    // have a look at the Quick start guide
    // for passing in lng and translations on init
    i18n
        // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
        // learn more: https://github.com/i18next/i18next-http-backend
        // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
        // .use(Backend)
        // detect user language
        // learn more: https://github.com/i18next/i18next-browser-languageDetector
        .use(LanguageDetector)
        // pass the i18n instance to react-i18next.
        .use(initReactI18next)
        // init i18next
        // for all options read: https://www.i18next.com/overview/configuration-options
        .init({
            detection: {
                // order and from where user language should be detected
                order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
                // keys or params to lookup language from
                lookupQuerystring: 'lng',
                lookupCookie: LOCALE_COOKIE_NAME,
                lookupLocalStorage: LOCALE_COOKIE_NAME,
                lookupSessionStorage: LOCALE_COOKIE_NAME,
                lookupFromPathIndex: 0,
                lookupFromSubdomainIndex: 0,

                // cache user language on
                caches: ['localStorage', 'cookie'],
                excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

                // optional expire and domain for set cookie
                cookieMinutes: 10,
                cookieDomain: 'myDomain',

                // optional htmlTag with lang attribute, the default is:
                htmlTag: document.documentElement,

                // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
                cookieOptions: {path: '/', sameSite: 'strict'},

                // optional conversion function to use to modify the detected language code
                convertDetectedLanguage: 'Iso15897',
                //convertDetectedLanguage: (lng) => lng.replace('-', '_')
            },
            resources: {
                en: {
                    translation: messages['en'],
                },
                fa: {
                    translation: messages['fa'],
                },
            },
            lng: lang,
            debug: false,

            interpolation: {
                escapeValue: false, // not needed for react as it escapes by default
            },
        });
    return i18n;
}