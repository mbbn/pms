import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {useCookies } from "react-cookie";
import getPMSTheme from '../getPMSTheme';
import {PaletteMode} from "@mui/material";
import AppAppBar from "../components/AppAppBar";
import Hero from "../components/Hero";
import "../assets/scss/main.scss";

export default function LandingPage() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const theme = createTheme(getPMSTheme(mode));

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode}/>
            {/*<Hero/>*/}
        </ThemeProvider>
    );
}