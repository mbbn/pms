import * as React from 'react';
import EmptyModel from "@common/model/EmptyModel";
import BaseView, {ViewState} from "@common/view/BaseView";
import ClientMessagesUtil from "@common/util/ClientMessagesUtil";
import {Box, Grid, Stack, Typography } from '@mui/material';
import * as console from "console";

interface AboutUsViewState {
    htmlText: string;
}

export default class AboutUsView extends BaseView<EmptyModel, string> {

    getInitialState(): ViewState<EmptyModel, string> & AboutUsViewState {
        return {
            htmlText: '',
            ...super.getInitialState()
        };
    }

    componentDidMount() {
        fetch("./html/about.html", {method: 'GET', cache: 'no-cache'}).then((response)=>response.text()).then(
            (htmlText)=>{
                this.setState({
                    htmlText: htmlText
                })
            }
        )
    }

    renderContent(): React.ReactNode {
        const {htmlText} = this.state;
        if(!htmlText){
            return null;
        }
        return <Stack spacing={2} useFlexGap sx={{width: {xs: '100%', sm: '100%'}}}>
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
        </Stack>;
    }
    createModel(props?: any): EmptyModel {
        return new EmptyModel(props);
    }
}