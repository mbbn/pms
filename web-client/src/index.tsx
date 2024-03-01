import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import LandingPage from "./view/LandingPage";
import {Route, BrowserRouter, Routes, useLocation} from "react-router-dom";
import i18n from "./i18n/i18n";
import UnderConstruct from "./view/UnderConstruct";
import SignInPage from "./view/SignInPage";
import SignUpPage from "./view/SignUpPage";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import getPMSTheme from "./getPMSTheme";
import {CacheProvider} from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);
const theme = createTheme(getPMSTheme('light'));
const {t,language, dir} = i18n;

document.dir = dir(language);

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
const cacheLtr = createCache({
    key: 'mui'
});

root.render(
    <CacheProvider value={dir(language) === 'rtl'? cacheRtl: cacheLtr}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter >
                <Routes>
                    {/*<Route path={"/"} element={<LandingPage/>}/>*/}
                    {/*<Route path={"/admin"} index={true} element={<UnderConstruct/>}/>*/}
                    <Route path={"/"} index={true} element={<SignUpPage/>}/>
                    {/*<Route path={"/signIn"} index={true} element={<SignInPage/>}/>*/}
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </CacheProvider>
);