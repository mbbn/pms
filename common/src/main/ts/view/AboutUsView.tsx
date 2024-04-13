import {useState, useEffect} from 'react';
import {Box, Grid, Stack, Typography } from '@mui/material';
import CompanyService from "@common/service/CompanyService";

export const AboutUsView = () => {
    const service = new CompanyService();
    const [htmlText, setHtmlText] = useState<string>('');
    useEffect(() => {
        service.currentCompany().then(value => {
            if (value && value.about) {
                setHtmlText(value.about);
            }
        })
    }, [setHtmlText]);

    return (<Stack spacing={2} useFlexGap sx={{width: {xs: '100%', sm: '100%'}}}>
        <Grid container spacing={2}>
            <Grid item xs={false} sm={3}>
                <Box component="div" sx={theme => ({
                    [theme.breakpoints.up("sm")] : {
                        minWidth: 175,
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
                    component="div"
                    sx={{
                        alignSelf: 'start',
                        textAlign: 'start',
                    }}
                    dangerouslySetInnerHTML={{__html: htmlText}}
                />
            </Grid>
        </Grid>
    </Stack>);
}