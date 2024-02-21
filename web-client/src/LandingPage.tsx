import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {useCookies } from "react-cookie";
import {IntlProvider} from 'react-intl';
import English from "./lang/en.json";
import Persian from "./lang/fa.json";
import getPMSTheme from './getPMSTheme';
import {PaletteMode} from "@mui/material";
import AppAppBar from "./components/AppAppBar";

export default function LandingPage() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const theme = createTheme(getPMSTheme(mode));
    const [cookies, setCookie] = useCookies(["locale"]);
    const [locale, setLocale] = React.useState<string>(cookies.locale ? cookies.locale : 'fa-IR');
    const [lang, setLang] = React.useState(locale === 'en-US' ? English : Persian);

    if (cookies.locale === undefined) {
        setCookie("locale", locale, { path: "/", maxAge: 10000, secure: true})
    }

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleLocale = () => {
        setLocale((prev) => (prev === 'fa-IR' ? 'en-US' : 'fa-IR'))
        setLang(locale === 'en-US' ? English : Persian);
        setCookie("locale", locale, { path: "/", maxAge: 10000, secure: true })
    };

    return (
        <div dir={locale === 'en-US' ? 'ltr' : 'rtl'}>
            <IntlProvider locale={locale} messages={lang} defaultLocale="fa-IR" timeZone="Asia/Terhan">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppAppBar mode={mode} toggleColorMode={toggleColorMode} locale={locale} toggleLocale={toggleLocale}/>
                </ThemeProvider>
            </IntlProvider>
        </div>
    );
}