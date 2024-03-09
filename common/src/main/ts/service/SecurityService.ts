import {BaseService} from "@common/service/BaseService";
import UserModel from "@common/model/UserModel";
import {jwtDecode} from "jwt-decode";

export default class SecurityService extends BaseService<UserModel, string>{
    protected createModel(props?: any): UserModel {
        return new UserModel(props);
    }
}