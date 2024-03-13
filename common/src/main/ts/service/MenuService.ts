import {BaseService} from "@common/service/BaseService";
import MenuModel from "@common/model/MenuModel";

export default class MenuService extends BaseService<MenuModel, string>{

    public async menus(): Promise<MenuModel[]> {
        let entityName = this.createModel().getEntityName();
        let menus = await this.get("/api/v1/" + entityName + "/");
        if(Array.isArray(menus)){
            return Array.from(menus).map(menu => this.createModel(menu));
        }
        return [];
    }

    protected createModel(props?: any): MenuModel {
        return new MenuModel(props);
    }
}