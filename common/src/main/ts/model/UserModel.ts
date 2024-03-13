import BaseModel from "@common/model/BaseModel";
import AuthorityModel from "@common/model/AuthorityModel";

export default class UserModel extends BaseModel<string> {

    id: string | undefined;
    isAdmin: boolean | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    authorities: AuthorityModel[] | undefined;

    constructor(props?: any) {
        super(props);
    }
}