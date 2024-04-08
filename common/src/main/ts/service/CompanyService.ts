import CompanyModel from "@common/model/CompanyModel";
import {BaseService} from "@common/service/BaseService";

export default class CompanyService extends BaseService<CompanyModel, string>{

    public async currentCompany(): Promise<CompanyModel> {
        let entityName = this.createModel().getEntityName().toLowerCase();
        let company = await this.get("/api/v1/" + entityName + "/");
        return this.createModel(company);
    }

    protected createModel(props?: any) {
        return  new CompanyModel(props);
    }
}