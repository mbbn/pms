import BaseModel from "@common/model/BaseModel";

export default class CompanyModel extends BaseModel<string> {

    public static readonly HOST_NAME = 'hostName';
    public static readonly LATIN_NAME = 'latinName';
    public static readonly PERSIAN_NAME = 'persianName';
    public static readonly ABOUT = 'about';

    id: string | undefined;
    hostName: string | undefined;
    latinName: string | undefined;
    persianName: string | undefined;
    about: string | undefined;

    constructor(props?: any) {
        super(props);
    }
}