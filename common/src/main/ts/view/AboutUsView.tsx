import * as React from 'react';
import BaseView, {ViewState} from "@common/view/BaseView";
import {Box, Grid, Stack, Typography } from '@mui/material';
import CompanyService from "@common/service/CompanyService";
import CompanyModel from "@common/model/CompanyModel";

interface AboutUsViewState {
    htmlText: string;
}

export default class AboutUsView extends BaseView<CompanyModel, string> {

    service: CompanyService = new CompanyService();

    getInitialState(): ViewState<CompanyModel, string> & AboutUsViewState {
        return {
            htmlText: '',
            ...super.getInitialState()
        };
    }

    constructor(props: any, context: any) {
        super(props, context, new CompanyService());
    }

    componentDidMount() {
        this.service.currentCompany().then(company=>{
            this.setState({
                htmlText: company.about
            })
        });
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

    createModel(props?: any): CompanyModel {
        return new CompanyModel(props);
    }
}