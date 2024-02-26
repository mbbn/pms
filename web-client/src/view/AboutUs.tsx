import * as React from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import i18n from "../i18n/i18n";
import {Trans} from "react-i18next";
import Stack from "@mui/material/Stack";
export default function AboutUs() {
    const {t} = i18n;

    return (
        <Stack spacing={2} useFlexGap sx={{width: {xs: '100%', sm: '100%'}}}>
            <Grid container spacing={2}>
                <Grid item xs={false} sm={3}>
                    <Box component="div" sx={theme => ({
                        [theme.breakpoints.up("sm")] : {
                            width: 175,
                            minHeight: 175
                        },
                        [theme.breakpoints.down("sm")] : {
                            display: "none"
                        },
                        backgroundImage:'url(./img/logo.webp)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                    })}/>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Typography
                        component="h1"
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: {xs: 'column', md: 'row'},
                            alignSelf: 'start',
                            textAlign: 'start',
                        }}
                    >
                        {t('about.prefixCompanyName')}&nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                            }}
                        >
                            {t('about.companyName')}
                        </Typography>
                    </Typography>
                    <Typography variant="body1" textAlign="start" justifyContent={"start"} color="text.secondary">
                        <Trans i18nKey="about.description.part1"/>
                    </Typography>
                    <Typography variant="body1" textAlign="start" justifyContent={"start"} color="text.secondary">
                        <Trans i18nKey="about.description.part2"/>
                    </Typography>
                    <Typography variant="body1" textAlign="start" justifyContent={"start"} color="text.secondary">
                        <Trans i18nKey="about.description.part3"/>
                    </Typography>
                    <Typography variant="body1" textAlign="start" justifyContent={"start"} color="text.secondary">
                        <Trans i18nKey="about.description.part4"/>
                    </Typography>
                </Grid>
            </Grid>
        </Stack>
    );
}