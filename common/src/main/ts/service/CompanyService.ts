import CompanyModel from "@common/model/CompanyModel";
import {BaseService} from "@common/service/BaseService";

export default class CompanyService extends BaseService<CompanyModel, string>{
    protected createModel(props?: any) {
        return  new CompanyModel(props);
    }

    public currentCompany(): Promise<CompanyModel> {
        let entityName = this.createModel().getEntityName();
        return this.get("/api/v1/" + entityName + "/")
            .then(company => this.createModel(company));
    }
}