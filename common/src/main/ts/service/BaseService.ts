export default class BaseService {
    get(path: string): Promise<Response> {
        return fetch(path, {
            method: 'GET',
            cache: 'no-cache'
        }).then((response)=>response.json());
    }

    post(path: string, body: any): Promise<Response> {
        return fetch(path, {
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify(body),
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response)=>response.json());
    }

    public static loadResource(path: string): Promise<string> {
        return fetch(path, {method: 'GET', cache: 'no-cache'}).then((response) => response.text());
    }
}