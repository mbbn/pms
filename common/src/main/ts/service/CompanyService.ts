import CompanyModel from "@common/model/CompanyModel";
import {BaseService} from "@common/service/BaseService";

export default class CompanyService extends BaseService<CompanyModel, string>{
    public static readonly INSTANCE = new CompanyService();

    protected createModel(props?: any) {
        return  new CompanyModel(props);
    }
}