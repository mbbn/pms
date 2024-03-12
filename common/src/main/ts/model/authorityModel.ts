import BaseModel from "@common/model/BaseModel";

export default class AuthorityModel extends BaseModel<string> {

    id: string;
    authority: string;

    constructor(props?: any) {
        super(props);
    }
}