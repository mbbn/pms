import BaseModel from "@common/model/BaseModel";
import {useEffect} from "react";

export abstract class BaseService<MODEL extends BaseModel<IdType>, IdType> {

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