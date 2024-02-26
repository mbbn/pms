import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import i18n from "../i18n/i18n";
import {Trans} from "react-i18next";
import {green} from "../getPMSTheme";
import {blue, pink} from "@mui/material/colors";


function Copyright() {
    const {t, format, language} = i18n;
    return (
        <Typography variant="body2" color="text.secondary" mt={1}>
            {'Copyright © '}
            <Link href="https://karakabin.com/">Karacabin&nbsp;</Link>
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {
    const {t} = i18n;
    return (
        <Container
            sx={theme => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: {xs: 4, sm: 8},
                py: {xs: 8, sm: 10},
                textAlign: {sm: 'center', md: theme.direction === 'rtl' ? 'right' : 'left'},
            })}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', sm: 'row'},
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        minWidth: {xs: '100%', sm: '60%'},
                    }}
                >
                    <Box sx={{width: {xs: '100%', sm: '60%'}}}>
                        <Box component="div" sx={theme => ({
                            [theme.breakpoints.up("sm")]: {
                                width: 200,
                                minHeight: 50
                            },
                            [theme.breakpoints.down("sm")]: {
                                width: 150,
                                minHeight: 30
                            },
                            backgroundImage: 'url(./img/logo.svg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            ml: -15
                        })}/>
                        <Typography variant="body2" fontWeight={600} gutterBottom>
                            <Trans i18nKey="footer.newsletter"/>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            <Trans i18nKey="footer.newsletter.description"/>
                        </Typography>
                        <Stack direction="row" spacing={1} useFlexGap>
                            <TextField
                                id="outlined-basic"
                                hiddenLabel
                                size="small"
                                variant="outlined"
                                fullWidth
                                aria-label={t('email.help')}
                                placeholder={t('email.placeholder')}
                            />
                            <Button variant="contained" color="primary" sx={{flexShrink: 0}}>
                                <Trans i18nKey={'subscribe'}/>
                            </Button>
                        </Stack>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: {xs: 'none', sm: 'flex'},
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        <Trans i18nKey="product"/>
                    </Typography>
                    <Link color="text.secondary" href="#">
                        <Trans i18nKey="pricing"/>
                    </Link>
                    <Link color="text.secondary" href="#">
                        <Trans i18nKey="faqs"/>
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: {xs: 'none', sm: 'flex'},
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        <Trans i18nKey="company"/>
                    </Typography>
                    <Link color="text.secondary" href="#">
                        <Trans i18nKey="aboutUs"/>
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: {xs: 'none', sm: 'flex'},
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        <Trans i18nKey="legal"/>
                    </Typography>
                    <Link color="text.secondary" href="#">
                        <Trans i18nKey="terms"/>
                    </Link>
                    <Link color="text.secondary" href="#">
                        <Trans i18nKey="privacy"/>
                    </Link>
                    <Link color="text.secondary" href="#">
                        <Trans i18nKey="contact"/>
                    </Link>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: {xs: 4, sm: 8},
                    width: '100%',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <div>
                    <Link color="text.secondary" href="#">
                        <Trans i18nKey="privacy.policy"/>
                    </Link>
                    <Typography display="inline" sx={{mx: 0.5, opacity: 0.5}}>
                        &nbsp;•&nbsp;
                    </Typography>
                    <Link color="text.secondary" href="#">
                        <Trans i18nKey="termsOfService"/>
                    </Link>
                    <Copyright/>
                </div>
                <Stack
                    direction="row"
                    justifyContent="left"
                    spacing={1}
                    useFlexGap
                    sx={{
                        color: 'text.secondary',
                    }}
                >
                    <IconButton
                        color="inherit"
                        href="https://github.com/mui"
                        aria-label="GitHub"
                        sx={{alignSelf: 'center'}}
                    >
                        <InstagramIcon sx={{color: pink[500]}}/>
                    </IconButton>
                    <IconButton
                        href="https://twitter.com/MaterialUI"
                        aria-label="X"
                        sx={{alignSelf: 'center'}}
                    >
                        <WhatsAppIcon sx={{color: green[500]}}/>
                    </IconButton>
                    <IconButton
                        color="inherit"
                        href="https://www.linkedin.com/company/mui/"
                        aria-label="LinkedIn"
                        sx={{alignSelf: 'center'}}
                    >
                        <PhoneIcon sx={{color: blue[500]}}/>
                    </IconButton>
                </Stack>
            </Box>
        </Container>
    );
}
