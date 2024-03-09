import {BaseService} from "@common/service/BaseService";
import UserModel from "@common/model/UserModel";
import {jwtDecode} from "jwt-decode";

export default class UserService extends BaseService<UserModel, string>{

    public async currentUser(callback: (user: UserModel) => void) {
        let entityName = this.createModel().getEntityName();
        let currentUser = await this.get("/api/v1/" + entityName + "/currentUser");
        callback(this.createModel(currentUser));
    }

    protected createModel(props?: any): UserModel {
        return new UserModel(props);
    }
}