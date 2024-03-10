import {BaseService} from "@common/service/BaseService";
import UserModel from "@common/model/UserModel";
import {jwtDecode} from "jwt-decode";

export default class UserService extends BaseService<UserModel, string>{

    public async currentUser():Promise<UserModel> {
        let entityName = this.createModel().getEntityName();
        let currentUser = await this.get("/api/v1/" + entityName + "/current");
        return await this.createModel(currentUser);
    }

    protected createModel(props?: any): UserModel {
        return new UserModel(props);
    }
}