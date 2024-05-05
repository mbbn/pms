import * as React from "react";
import {HashRouter,Routes, Route} from "react-router-dom";
import MenuPanel from "@common/component/MenuPanel";
import {
    Box,
    Container,
    Paper,
    Grid
} from "@mui/material";
import {blueGrey} from "@mui/material/colors";
import AppAppBar from "@common/component/AppAppBar";
import {Footer} from "@common/component/Footer";

export interface View {
    path: string;
    component: React.ComponentType;
}
interface RouteContextProps {
}

const RouteContext = React.createContext<RouteContextProps>({
});

interface RouteProps {
    views : View[];
}

export const RouteProvider = ({views}: RouteProps) => {
    const value = React.useMemo(
        () => ({
        }),
        []
    );

    return <RouteContext.Provider value={value}>
        <HashRouter>
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
                    pt: {xs: 9, sm: 12},
                    pb: {xs: 8, sm: 12},
                }}>
                    <Grid container spacing={{xs: 2, md:3}}>
                        <Grid item xs={0} md={3}>
                            <MenuPanel sx={{display: {xs: 'none', md: 'block'}}}/>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Routes>
                                {views.map((view, viewIndex) => <Route key={viewIndex} index={viewIndex === 0} path={view.path} Component={view.component}/>)}
                            </Routes>
                        </Grid>
                    </Grid>
                </Container>
                <Paper sx={{
                    backgroundColor: blueGrey[50],
                    pt: {xs: 9, sm: 12},
                    pb: {xs: 8, sm: 12},
                }}>
                    <Footer/>
                </Paper>
            </Box>
        </HashRouter>
    </RouteContext.Provider>
}