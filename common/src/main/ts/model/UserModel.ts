import BaseModel from "@common/model/BaseModel";
import AuthorityModel from "@common/model/authorityModel";

export default class UserModel extends BaseModel<string> {

    id: string;
    isAdmin: boolean;
    firstName: string;
    lastName: string;
    authorities: AuthorityModel[];

    constructor(props?: any) {
        super(props);
    }
}