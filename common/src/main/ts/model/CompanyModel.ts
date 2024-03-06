import BaseModel from "@common/model/BaseModel";

export default class CompanyModel extends BaseModel<string> {

    id: string;
    hostName: string;
    latinName: string;
    persianName: string;
    about: string;

    constructor(props?: any) {
        super(props);
    }
}