import * as React from 'react';
import {createTheme, Theme, ThemeOptions} from "@mui/material";
import {useAuth} from "@common/provider/AuthProvider";
import {LocalProvider, useLocal} from "@common/provider/LocalProvider";
import {
    ThemeProvider,
    CssBaseline,
    Box,
    Container,
    Grid
} from "@mui/material";
import {defaultThemeOptions, adminThemeOptions} from "@common/theme/Theme";
import {ExpandMore as ExpandMoreIcon, ChevronRight as ChevronRightIcon} from '@mui/icons-material';
import {TreeView, TreeItem} from '@mui/x-tree-view';
import "@common/assets/scss/main.scss";
import AppAppBar from "@common/component/AppAppBar";
import {Context, useEffect} from "react";
import MenuModel from "@common/model/MenuModel";
import MenuService from "@common/service/MenuService";

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
                        <Grid container spacing={2}>
                            <Grid item md={2}>
                                <TreeView aria-label="file system navigator"
                                          defaultCollapseIcon={<ExpandMoreIcon/>}
                                          defaultExpandIcon={<ChevronRightIcon/>}>
                                    {appValue.menus.map((menu, index) => <TreeItem nodeId={''+index} label={menu.title}/>)}
                                </TreeView>
                            </Grid>
                            <Grid item md={8}>content</Grid>
                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
        </LocalProvider>
    </AppContext.Provider>);
};
export const useApp = () => {
    return React.useContext(AppContext);
};