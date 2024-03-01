import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getPMSTheme from '../getPMSTheme';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import "../assets/scss/main.scss";
import i18n from "../i18n/i18n";
import Container from "@mui/material/Container";
import UserModel from "../model/UserModel";
import Form from "../components/form/Form";
import TextField from "@mui/material/TextField";
import BaseView, {BaseViewProps} from "./BaseView";

export default class SignUpPage extends BaseView<UserModel> {

    createModel(props?: any): UserModel {
        return new UserModel(props);
    }
    renderContent(): React.ReactNode {
        const {t, dir, language, format} = i18n;

        return <Container component={'main'} maxWidth={"xs"}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Form originModel={this.getModel()} title={t('signUp')}
                      icon={<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                          <LockOutlinedIcon />
                      </Avatar>}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id={UserModel.FIRST_NAME}
                                name={UserModel.FIRST_NAME}
                                // placeholder={this.getMessage(UserModel.FIRST_NAME)}
                                label={this.getMessage(UserModel.FIRST_NAME)}
                                // helperText={this.getMessage('signUp.firstName.help')}
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                </Form>
            </Box>
        </Container>;
    }
}

/*
function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUpPage() {
    const {t, dir, language, format} = i18n;
    const [user, setUser] = useState(new UserModel());

    return (
        <Container component={'main'} maxWidth={"xs"}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Form originModel={user} title={t('signUp')}
                      icon={<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                          <LockOutlinedIcon />
                      </Avatar>}
                      fields={[
                          {
                              type: "textField",
                              required: true,
                              id: "firstName",
                              name: "firstName",
                              placeholder: t('signUp.firstName'),
                              label: t('signUp.firstName'),
                              width: 6
                          },
                          {
                              type: "textField",
                              required: true,
                              id: "lastName",
                              name: "lastName",
                              placeholder: t('signUp.lastName'),
                              label: t('signUp.lastName'),
                              width: 6
                          },
                          {
                              type: "textField",
                              required: true,
                              id: "mobile",
                              name: "mobile",
                              placeholder: t('mobile.placeholder'),
                              label: t('mobile')
                          },
                          {
                              type: "password",
                              required: true,
                              id: "password",
                              name: "password",
                              label: t('signUp.password'),
                              autoComplete:'new-password'
                          }
                      ]}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="firstName"
                                name="firstName"
                                placeholder={t('signUp.firstName')}
                                label={t('signUp.firstName')}
                                helperText={t('signUp.firstName.help')}
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                </Form>
                {/!*<Form originModel={user} title={t('signUp')}
                              icon={<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                  <LockOutlinedIcon />
                              </Avatar>}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        name="lastName"
                                        placeholder={t('signUp.lastName')}
                                        label={t('signUp.lastName')}
                                        helperText={t('signUp.lastName.help')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        placeholder={t('email.placeholder')}
                                        label={t('email')}
                                        helperText={t('email.help')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label={t('signUp.password')}
                                        helperText={t('signUp.password.help')}
                                        type="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {t('signUp')}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        {t('signUp.alreadyHaveAccount')}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>*!/}
                {/!*<Box component="form" noValidate sx={{ mt: 1 }}>

                        </Box>*!/}
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}*/
