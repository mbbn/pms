import BaseModel from "@common/model/BaseModel";

export default class CompanyModel extends BaseModel<string> {

    id: string | undefined;
    hostName: string | undefined;
    latinName: string | undefined;
    persianName: string | undefined;
    about: string | undefined;

    constructor(props?: any) {
        super(props);
    }
}