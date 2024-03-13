import * as React from 'react';
import {createTheme, ThemeOptions} from "@mui/material";
import {useAuth} from "@common/hooks/AuthProvider";
import {LocalProvider, useLocal} from "@common/hooks/LocalProvider";
import {
    ThemeProvider,
    CssBaseline,
    useScrollTrigger,
    Box,
    AppBar,
    Toolbar,
    Typography,
    Container
} from "@mui/material";
import {defaultThemeOptions, adminThemeOptions} from "@common/theme/Theme";
import "@common/assets/scss/main.scss";

interface AppContextProps {
    uiTheme?: ThemeOptions
}

const AppContext = React.createContext<AppContextProps>({});

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
    const [themeOption, setThemeOption] = React.useState(() => {
        if(auth && auth.isAdmin()){
            return adminThemeOptions(local.dir, 'light');
        }
        return defaultThemeOptions(local.dir, 'light');
    });
    const value = React.useMemo(
        () => ({
            uiTheme: createTheme(themeOption)
        }),
        [setThemeOption]
    );
    return (<AppContext.Provider value={value}>
        <LocalProvider messages={props.messagesJson} lang={"en"}>
            <ThemeProvider theme={value.uiTheme}>
                <CssBaseline/>
                <Box>
                    <AppBar>
                        <Toolbar>
                            <Typography variant="h6" component="div">
                                Scroll to elevate App bar
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Toolbar/>
                <Container>
                    <Box sx={{my: 2}}>
                        {[...new Array(50)]
                            .map(
                                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                            )
                            .join('\n')}
                    </Box>
                </Container>
            </ThemeProvider>
        </LocalProvider>
    </AppContext.Provider>);
};
export const useApp = () => {
    return React.useContext(AppContext);
};