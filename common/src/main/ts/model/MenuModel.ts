import BaseModel from "@common/model/BaseModel";

export default class MenuModel extends BaseModel<string> {

    id: string | undefined;
    title: string | undefined;

    constructor(props?: any) {
        super(props);
    }
}