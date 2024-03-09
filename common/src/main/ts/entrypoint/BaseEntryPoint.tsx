import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import getContext from "@common/entrypoint/ContextManager";
import createCache from "@emotion/cache";
import {CacheProvider} from "@emotion/react";
import {ThemeProvider, AppBar, Container, Toolbar, Box} from "@mui/material";
import Locale from "@common/locale/Locale";
import {HashRouter, Routes, Route} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AbstractViewName from "@common/view/AbstractViewName";
import i18n from "@common/i18n/i18n";
import "@common/assets/scss/main.scss";
import {AuthProvider} from "@common/hooks/AuthProvider";
import UserModel from "@common/model/UserModel";
import SecurityService from "@common/service/SecurityService";
import UserService from "@common/service/UserService";
import {useState} from "react";
export interface BaseEntryPointState {
    currenUser: any;
    uiTheme: {
        direction: 'rtl'|'ltr',
        mode: 'light' | 'dark'
    }
}
export default abstract class BaseEntryPoint extends React.Component<any, any> {

    static readonly ROOT_DIV_ID = '@rootDiv@';

    static instance;

    state: Readonly<BaseEntryPointState> = this.getInitialState();

    getInitialState(): BaseEntryPointState {
        let i18n = this.setI18n(Locale.FA);
        const [currentUser, setCurrentUser] = useState<UserModel>();
        let userService = new UserService();
        userService.currentUser(user => {
            setCurrentUser(user);
        });
        return {
            currenUser: currentUser,
            uiTheme: {
                direction: i18n.dir(i18n.language),
                mode: 'light'
            }
        };
    }
    constructor(props: any, context: any) {
        super(props, context);
        BaseEntryPoint.instance = this;
    }
    static render(component: any): void {
        const rootElement = document.getElementById(BaseEntryPoint.ROOT_DIV_ID);
        const root = createRoot(rootElement);
        root.render(component);
    }
    render() {
        const {uiTheme, currenUser} = this.state;
        const styleContext = getContext(uiTheme);
        const cacheRtl = createCache({
            key: 'muirtl',
            stylisPlugins: [prefixer, rtlPlugin],
        });
        const cacheLtr = createCache({
            key: 'mui'
        });
        let direction = this.state.uiTheme.direction;
        return <AuthProvider currentUser={currenUser}>
            <CacheProvider value={direction === 'rtl' ? cacheRtl : cacheLtr}>
                <ThemeProvider theme={styleContext.theme}>
                    <CssBaseline/>
                    <HashRouter>
                        <Routes >
                            <Route path="/" element={<div>ssss</div>}/>
                        </Routes>
                    </HashRouter>
                </ThemeProvider>
            </CacheProvider>
        </AuthProvider>

        /*return (<CacheProvider value={direction === 'rtl' ? cacheRtl : cacheLtr}>
            <ThemeProvider theme={styleContext.theme}>
                <CssBaseline/>
                <HashRouter>
                    <AppBar
                        position="fixed"
                        sx={{
                            boxShadow: 0,
                            bgcolor: 'transparent',
                            backgroundImage: 'none',
                            mt: 2,
                        }}>
                        <Container maxWidth="lg">
                            <Toolbar
                                variant="regular"
                                sx={(theme) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexShrink: 0,
                                    borderRadius: '999px',
                                    bgcolor:
                                        theme.palette.mode === 'light'
                                            ? 'rgba(255, 255, 255, 0.4)'
                                            : 'rgba(0, 0, 0, 0.4)',
                                    backdropFilter: 'blur(24px)',
                                    maxHeight: 40,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow:
                                        theme.palette.mode === 'light'
                                            ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                            : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                                })}
                            >
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        ml: '-18px',
                                        px: 0,
                                    }}
                                >
                                    <Box component="div" sx={theme => ({
                                        cursor: 'pointer',
                                        [theme.breakpoints.up("sm")] : {
                                            width: 200,
                                            minHeight: 50
                                        },
                                        [theme.breakpoints.down("sm")] : {
                                            width: 150,
                                            minHeight: 30
                                        },
                                        backgroundImage: direction === 'ltr' ? 'url(./img/logo.svg)' : 'url(./img/logo-rtl.svg)',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                    })}/>
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    <Box
                        sx={(theme) => ({
                            width: '100%',
                            backgroundImage:
                                theme.palette.mode === 'light'
                                    ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                                    : 'linear-gradient(#02294F, #090E10)',
                            backgroundSize: '100% 20%',
                            backgroundRepeat: 'no-repeat',
                        })}
                    >
                        <Container
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                                pt: {xs: 14, sm: 20},
                                pb: {xs: 8, sm: 12},
                            }}
                        >
                            <NavigationManager firstViewName={this.getFirstViewName()}/>
                        </Container>
                    </Box>
                </HashRouter>
            </ThemeProvider>
        </CacheProvider>);*/
    }

    abstract getMessagesJson(): any;

    abstract getFirstViewName(): AbstractViewName;

    protected setI18n(lang: 'fa'|'en') {
        // init i18next
        // for all options read: https://www.i18next.com/overview/configuration-options
        let messagesJson = this.getMessagesJson();
        i18n.init({
            detection: {
                // order and from where user language should be detected
                order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
                // keys or params to lookup language from
                lookupQuerystring: 'lng',
                lookupCookie: Locale.LOCALE_COOKIE_NAME,
                lookupLocalStorage: Locale.LOCALE_COOKIE_NAME,
                lookupSessionStorage: Locale.LOCALE_COOKIE_NAME,
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
                cookieOptions: { path: '/', sameSite: 'strict' },

                // optional conversion function to use to modify the detected language code
                convertDetectedLanguage: 'Iso15897',
                //convertDetectedLanguage: (lng) => lng.replace('-', '_')
            },
            resources: {
                en: {
                    translation: messagesJson['en'],
                },
                fa: {
                    translation: messagesJson['fa'],
                },
            },
            lng: lang,
            debug: false,

            interpolation: {
                escapeValue: false, // not needed for react as it escapes by default
            },
        });
        document.body.dir = i18n.dir(i18n.language);
        /*if (locale === Locale.FA) {
            DatePicker.initializeJalaliCalendar();
        }*/
        return i18n;
    }
}