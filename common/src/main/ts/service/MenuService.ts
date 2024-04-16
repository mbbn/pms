import {BaseService} from "@common/service/BaseService";
import MenuModel from "@common/model/MenuModel";

export default class MenuService extends BaseService<MenuModel, string> {

    public static readonly INSTANCE = new MenuService();

    protected createModel(props?: any): MenuModel {
        return new MenuModel(props);
    }
}