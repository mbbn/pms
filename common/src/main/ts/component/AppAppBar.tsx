import * as React from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Container,
    MenuItem,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useAuth} from "@common/provider/AuthProvider";
import {useApp} from "@common/entrypoint/BaseEntryPoint";
import {useLocal} from "@common/provider/LocalProvider";
import {Link} from 'react-router-dom';

function AppAppBar(){
    let auth = useAuth();

    return (<div>
        <AppBar>
            {auth && auth.isAdmin() ? <AppToolbar/> : <Container maxWidth="lg"><AppToolbar/></Container>}
        </AppBar>
    </div>);
}

function AppToolbar(){
    const [open, setOpen] = React.useState(false);
    let local = useLocal();
    let app = useApp();
    const scrollToSection = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
    };

    return (<Toolbar>
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
            }}
        >
            <Box component="div" sx={theme => ({
                cursor: 'pointer',
                [theme.breakpoints.up("sm")] : {
                    width: 200,
                    minHeight: 50
                },
                [theme.breakpoints.down("sm")] : {
                    width: 150,
                    minHeight: 30
                },
                backgroundImage: local.dir === 'ltr' ? 'url(./img/logo.svg)' : 'url(./img/logo-rtl.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
            })}/>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {app.menus ? app.menus.map((menu, index) =>
                    <MenuItem key={menu.id}
                        onClick={() => scrollToSection('features')}
                        sx={{ py: '6px', px: '12px' }}
                    >
                        <Typography variant="body1" color="text.primary">
                            {menu.path ? <Link to={menu.path}>{menu.title}</Link> : menu.title}
                        </Typography>
                    </MenuItem>): null}
            </Box>
        </Box>
    </Toolbar>);
}
export default AppAppBar;