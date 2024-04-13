import * as React from "react";
import {initLocalization} from "@common/i18n/Localization";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {Direction,
    createTheme, Theme, ThemeOptions} from "@mui/material";
import {ThemeProvider, CssBaseline} from "@mui/material";
import {useAuth} from "@common/provider/AuthProvider";
import {adminThemeOptions, defaultThemeOptions} from "@common/theme/Theme";

interface LocalContextProps {
    lang?: string;
    dir?: Direction;
    uiTheme?: Theme
    getMessage(key: string): string;
    getBaseMessage(key: string): string;
}

const LocalContext = React.createContext<LocalContextProps>({
    getMessage: ()=> '',
    getBaseMessage: ()=> ''
});

interface LocalProviderProps {
    children: any;
    messagesJson: {};
}

export const LocalProvider = ({messagesJson, children}: LocalProviderProps) => {
    const i18n = initLocalization(messagesJson, 'fa');
    const direction = i18n.dir(i18n.language);
    document.body.dir = direction;
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });
    const cacheLtr = createCache({
        key: 'mui'
    });
    let auth = useAuth();
    let themeOption: ThemeOptions;
    if (auth && auth.isAdmin()) {
        themeOption = adminThemeOptions(direction, 'light');
    } else {
        themeOption = defaultThemeOptions(direction, 'light');
    }
    let uiTheme = createTheme(themeOption);

    const value = React.useMemo(
        () => ({
            uiTheme: uiTheme,
            getMessage(key: string): string {
                return i18n.t(key);
            },
            getBaseMessage(key: string): string {
                return i18n.t('Base.'+key);
            }
        }),
        []
    );
    return <LocalContext.Provider value={value}>
        <CacheProvider value={direction === 'rtl' ? cacheRtl : cacheLtr}>
            <ThemeProvider theme={uiTheme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </CacheProvider>
    </LocalContext.Provider>;
}

export const useLocal = () => {
    return React.useContext<LocalContextProps>(LocalContext);
};