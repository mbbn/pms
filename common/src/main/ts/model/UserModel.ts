import BaseModel from "@common/model/BaseModel";

export default class UserModel extends BaseModel<string> {

    id: string;
    firstName: string;
    lastName: string;

    constructor(props?: any) {
        super(props);
    }
}