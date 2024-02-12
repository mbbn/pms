import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CookiesProvider, useCookies } from "react-cookie";
import {FormattedMessage, IntlProvider} from 'react-intl';
import English from "./lang/en.json";
import Persian from "./lang/fa.json";
import getPMSTheme from './getPMSTheme';
import {PaletteMode} from "@mui/material";
import AppAppBar from "./components/AppAppBar";

export default function LandingPage() {
    const theme = createTheme(getPMSTheme());
    const [mode, setMode] = React.useState<PaletteMode>('dark');
    const [cookies, setCookie] = useCookies(["locale"]);
    const [locale, setLocale] = React.useState(cookies.locale ? cookies.locale : 'fa-IR');
    const [lang, setLang] = React.useState(locale === 'en' ? English : Persian);
    const handleLocale = (locale: string) => {
        setLocale(locale);
        setLang(locale === 'en' ? English : Persian);
        setCookie("locale", locale, { path: "/", maxAge: 10000, secure: true })
    }
    if (cookies.locale === undefined) {
        setCookie("locale", locale, { path: "/", maxAge: 10000, secure: true})
    }

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <IntlProvider locale={locale} messages={lang}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            </ThemeProvider>
        </IntlProvider>
    );
}