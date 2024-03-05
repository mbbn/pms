import CompanyModel from "@common/model/CompanyModel";
import {BaseService} from "@common/service/BaseService";

export default class CompanyService extends BaseService<CompanyModel>{
    protected createModel(props?: any) {
        throw new CompanyModel(props);
    }

    public currentCompany():CompanyModel{
        console.log(this.createModel());
        return null;
    }
}