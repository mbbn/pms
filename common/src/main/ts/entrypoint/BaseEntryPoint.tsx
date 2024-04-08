import * as React from 'react';
import {createTheme, Theme, ThemeOptions} from "@mui/material";
import {useAuth} from "@common/provider/AuthProvider";
import {LocalProvider, useLocal} from "@common/provider/LocalProvider";
import {
    ThemeProvider,
    CssBaseline,
    Box,
    Container
} from "@mui/material";
import {defaultThemeOptions, adminThemeOptions} from "@common/theme/Theme";
import "@fontsource/roboto"; // Defaults to weight 400
import "@common/assets/scss/main.scss";
import AppAppBar from "@common/component/AppAppBar";
import {Context, useEffect} from "react";
import MenuModel from "@common/model/MenuModel";
import MenuService from "@common/service/MenuService";
import AbstractViewName from "@common/view/AbstractViewName";
import NavigationManager from "@common/view/NavigationManager";

interface AppContextProps {
    uiTheme?: Theme
    menus: MenuModel[]
}

const AppContext: Context<AppContextProps> = React.createContext<AppContextProps>({
    menus: []
});
interface ScrollProps {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children?: React.ReactElement;
}

interface AppProps extends ScrollProps {
    messagesJson: {};
    firstViewName: AbstractViewName;
}

export const AppProvider = (props: AppProps) => {
    let local = useLocal();
    let auth = useAuth();
    let themeOption:ThemeOptions;
    if (auth && auth.isAdmin()) {
        themeOption = adminThemeOptions(local.dir, 'light');
    } else {
        themeOption = defaultThemeOptions(local.dir, 'light');
    }
    let uiTheme = createTheme(themeOption);
    const [appValue, setAppValue] = React.useState((): AppContextProps  => {
        return {
            uiTheme,
            menus: []
        }
    });
    useEffect(() => {
        const menuService = new MenuService();
        menuService.menus().then(menus =>{
            setAppValue({
                uiTheme,
                menus
            })
        });
        return () => {};
    }, []);

    return (<AppContext.Provider value={appValue}>
        <LocalProvider messages={props.messagesJson} lang={"fa"}>
            <ThemeProvider theme={uiTheme}>
                <CssBaseline/>
                <AppAppBar/>
                <Box sx={(theme) => ({
                    width: '100%',
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                            : 'linear-gradient(#02294F, #090E10)',
                    backgroundSize: '100% 20%',
                    backgroundRepeat: 'no-repeat',
                })}>
                    <Container maxWidth="lg" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        pt: {xs: 14, sm: 20},
                        pb: {xs: 8, sm: 12},
                    }}>
                        <NavigationManager firstViewName={props.firstViewName}/>
                    </Container>
                </Box>
            </ThemeProvider>
        </LocalProvider>
    </AppContext.Provider>);
};
export const useApp = () => {
    return React.useContext(AppContext);
};