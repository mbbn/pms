import BaseModel from "@common/model/BaseModel";

export default class AuthorityModel extends BaseModel<string> {

    id: string | undefined;
    authority: string | undefined;

    constructor(props?: any) {
        super(props);
    }
}