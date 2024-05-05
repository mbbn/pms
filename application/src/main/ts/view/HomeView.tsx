import {
    Box,
    Container,
    Paper,
    Grid
} from "@mui/material";
import {AboutUsView} from "@common/view/AboutUsView";
export const HomeView = () => {
    return <Grid container spacing={{xs: 2, md:3}}>
        <AboutUsView/>
    </Grid>
}