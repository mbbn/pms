import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getPMSTheme from '../getPMSTheme';
import {alpha, Card, CardContent, CardMedia, PaletteMode} from "@mui/material";
import AppAppBar from "../components/AppAppBar";
import "../assets/scss/main.scss";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Footer from "../components/Footer";
import Container from "@mui/material/Container";
import AboutUs from "./AboutUs";
import Grid from "@mui/material/Grid";

let cars = [
    {
      "title":"آریسان",
      "url":"./img/group/arisun.webp"
    },
    {
        "title":"کاپرا",
        "url":"./img/group/capra.webp"
    },
    {
        "title":"فوتون",
        "url":"./img/group/foton.webp"
    },
    {
        "title":"مزدا",
        "url":"./img/group/mazda.webp"
    },
    {
        "title":"پیکاپ",
        "url":"./img/group/pikup.webp"
    },
    {
        "title":"KMC T8",
        "url":"./img/group/t8.webp"
    },
    {
        "title":"تویوتا",
        "url":"./img/group/toyota.webp"
    }
];

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
            <Box
                id="hero"
                sx={(theme) => ({
                    width: '100%',
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                            : 'linear-gradient(#02294F, #090E10)',
                    backgroundSize: '100% 20%',
                    backgroundRepeat: 'no-repeat',
                })}
            >
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        pt: {xs: 14, sm: 20},
                        pb: {xs: 8, sm: 12},
                    }}
                >
                    <AboutUs/>
                    <Grid container spacing={1} columns={{xs:4, md:12}}
                        sx={(theme) => ({
                            mt: {xs: 8, sm: 10},
                        })}
                    >
                        {cars.map(car =>
                            <Grid item xs={12} sm={8} md={2}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={car.url}
                                        />
                                    <CardContent>{car.title}</CardContent>
                                </Card>
                            </Grid>)}
                    </Grid>
                </Container>
            </Box>
            <Box sx={{ bgcolor: 'background.default' }}>
                <Divider/>
                <Footer/>
            </Box>
        </ThemeProvider>
    );
}