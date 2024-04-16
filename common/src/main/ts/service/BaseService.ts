import BaseModel from "@common/model/BaseModel";

export abstract class BaseService<MODEL extends BaseModel<IdType>, IdType> {

    static readonly SLASH = '/';
    static readonly API_PREFIX = '/api/v1/';

    protected async get(path: string): Promise<MODEL|null> {
        try {
            let response = await fetch(path, {method: 'GET',cache: 'no-cache'});
            if(!response.ok){
                throw response.statusText;
            }
            return response.json();
        } catch (e){
            console.error(e);
            return null;
        }
    }

    protected async post(path: string, body: any): Promise<MODEL|null>  {
        try {
            let response = await fetch(path, {
                method: 'POST',
                cache: 'no-cache',
                body: JSON.stringify(body),
                headers:{
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            if(!response.ok){
                throw response.statusText;
            }
            return response.json();
        } catch (e){
            console.error(e);
            return null;
        }
    }

    protected async put(path: string, body: any): Promise<MODEL|null>  {
        try {
            let response = await fetch(path, {
                method: 'PUT',
                cache: 'no-cache',
                body: JSON.stringify(body),
                headers:{
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            if(!response.ok){
                throw response.statusText;
            }
            return response.json();
        } catch (e){
            console.error(e);
            return null;
        }
    }

    public async loadCurrentModels(): Promise<MODEL> {
        const entityName = this.createModel().getEntityName().toLowerCase();
        let model = await this.get(BaseService.API_PREFIX + entityName.toLowerCase() + BaseService.SLASH);
        return this.createModel(model);
    }

    public async loadAllModels(): Promise<MODEL[]> {
        const entityName = this.createModel().getEntityName();
        let models = await this.get(BaseService.API_PREFIX + entityName.toLowerCase() + BaseService.SLASH);
        if (Array.isArray(models)) {
            return Array.from(models).map(model => this.createModel(model));
        }
        return [];
    }

    public async update(model: MODEL): Promise<MODEL> {
        const entityName = model.getEntityName();
        let id = model.id;
        let updatedModel = await this.put(BaseService.API_PREFIX + entityName.toLowerCase() + BaseService.SLASH + id, model)
        return this.createModel(updatedModel);
    }

    protected abstract createModel(props?: any): MODEL;

    public static loadResource(path: string): Promise<string> {
        return fetch(path, {method: 'GET', cache: 'no-cache'}).then((response) => response.text());
    }
}