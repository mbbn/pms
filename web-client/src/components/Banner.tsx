import * as React from 'react';
import Box from "@mui/material/Box";
import Carousel from "react-material-ui-carousel";

export default function Banner() {
    return (
        <Carousel
            animation="slide"
            indicators={true}
            navButtonsAlwaysVisible={true}
            navButtonsAlwaysInvisible={false}
            cycleNavigation={true}
            fullHeightHover={false}
            sx={{
                width: '100vw',
                height: '70%'
            }}
        >
            <Box
                sx={{
                    width: '100vw',
                    height: '70%'
                }}
                component="img"
                src="./img/2546-pic.jpg"
            />
            <Box
                sx={{
                    width: '100vw',
                    height: '70%'
                }}
                component="img"
                src="./img/2545-pic.jpg"
            />
        </Carousel>
    );
}