import {BaseService} from "@common/service/BaseService";
import CategoryModel from "../model/CategoryModel";

export default class CategoryService extends BaseService<CategoryModel, string>{
    public static readonly INSTANCE = new CategoryService();

    protected createModel(props?: any) {
        return  new CategoryModel(props);
    }
}