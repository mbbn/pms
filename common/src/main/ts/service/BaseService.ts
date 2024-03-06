import BaseModel from "@common/model/BaseModel";

export abstract class BaseService<MODEL extends BaseModel<IdType>, IdType> {
    protected load(id: IdType): Promise<MODEL> {
        let entityName = this.createModel().getEntityName();
        return this.get("/" + entityName + "/load/" + id)
            .then(response => {
                return response.json();
            });
    }

    protected get(path: string): Promise<Response> {
        return fetch(path, {
            method: 'GET',
            cache: 'no-cache'
        }).then((response)=>response.json());
    }

    private post(path: string, body: any): Promise<Response> {
        return fetch(path, {
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify(body),
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response)=>response.json());
    }

    protected abstract createModel(props?:any):MODEL;

    public static loadResource(path: string): Promise<string> {
        return fetch(path, {method: 'GET', cache: 'no-cache'}).then((response) => response.text());
    }
}