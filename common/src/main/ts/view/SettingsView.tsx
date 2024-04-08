import { ReactNode } from "react";
import BaseView from "@common/view/BaseView";
import CompanyModel from "@common/model/CompanyModel";
import CompanyService from "@common/service/CompanyService";
import {Card, CardHeader, CardContent, Avatar} from "@mui/material";
import {Settings} from "@mui/icons-material";
import {getBaseMessage} from "@common/provider/LocalProvider";

export default class SettingsView extends BaseView<CompanyModel, string> {

    service: CompanyService = new CompanyService();
    renderContent(): ReactNode {
        return <Card variant="outlined">
            <CardHeader title={getBaseMessage('settings')} avatar={<Avatar><Settings color="primary"/></Avatar>}/>
        </Card>;
    }
    createModel(props?: any): CompanyModel {
        return new CompanyModel(props);
    }

}