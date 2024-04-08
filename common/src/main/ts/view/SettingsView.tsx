import BaseView from "@common/view/BaseView";
import CompanyModel from "@common/model/CompanyModel";
import CompanyService from "@common/service/CompanyService";
import { ReactNode } from "react";

export default class SettingsView extends BaseView<CompanyModel, string> {

    service: CompanyService = new CompanyService();
    renderContent(): ReactNode {
        return <>sssssssssssssssss</>;
    }
    createModel(props?: any): CompanyModel {
        return new CompanyModel(props);
    }

}