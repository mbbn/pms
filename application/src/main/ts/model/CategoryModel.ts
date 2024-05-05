import BaseModel from "@common/model/BaseModel";

export default class CategoryModel extends BaseModel<string> {

    public static readonly LATIN_NAME = 'latinName';
    public static readonly PERSIAN_NAME = 'persianName';
    public static readonly IMAGE = 'image';

    latinName: string | undefined;
    persianName: string | undefined;
    image: string | undefined;

    constructor(props?: any) {
        super(props);
    }
}