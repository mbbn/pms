import * as React from 'react';
import {PaletteMode} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import getPMSTheme from "../getPMSTheme";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "../components/AppAppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import i18n from "../i18n/i18n";
export default function UnderConstruct() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const theme = createTheme(getPMSTheme(mode));
    const {t, dir, language} = i18n;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{
                height: '100vh',
                color: theme.palette.common.white,
                alignItems: 'center',
                textAlign:'center',
                backgroundImage: 'url(./img/wallpaper.webp)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <Box sx={{
                    height: '100vh',
                    paddingTop: '30vh',
                    background: 'rgba(0, 0, 0, 0.6)' /* Green background with 30% opacity */
                }}>
                    <Typography component="h1" variant="h5" sx={{
                        fontSize: 'large'
                    }}>
                        {t('underConstruct.part1')}
                    </Typography>
                    <Typography component="h1" variant="h5" sx={{
                        fontSize: 'middle'
                    }}>
                        {t('underConstruct.part2')}
                    </Typography>
                    <Button
                        type="button"
                        color={'info'}
                        variant="contained"
                        href={"/"}
                        sx={{ mt: 3, mb: 2 }}>
                        {t('back')}
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
}