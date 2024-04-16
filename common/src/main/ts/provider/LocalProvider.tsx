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

    getMessage(model: {}, key: string, arg?: {}): string;
    getBaseMessage(key: string, arg?: {}): string;
    getCommonMessage(key: string, arg?: {}): string;
}

const LocalContext = React.createContext<LocalContextProps>({
    getMessage: ()=> '',
    getBaseMessage: ()=> '',
    getCommonMessage: ()=> ''
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
            getMessage(messageKey: any | string, key: string, arg?: {}): string {
                if (typeof messageKey === "function") {
                    messageKey = messageKey.name;
                }
                messageKey = messageKey.replace("Model", "");
                return i18n.t(messageKey + '.' + key, arg);
            },
            getBaseMessage(key: string, arg?: {}): string {
                return i18n.t('Base.'+key, arg);
            },
            getCommonMessage(key: string, arg?: {}): string {
                return i18n.t('Common.'+key, arg);
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