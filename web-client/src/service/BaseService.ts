export default class BaseService {
    get(path: string): Promise<Response> {
        return fetch(path, {
            method: 'GET'
        }).then((response)=>response.json());
    }

    post(path: string, body: any): Promise<Response> {
        return fetch(path, {
            method: 'POST',
            body: JSON.stringify(body),
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((response)=>response.json());
    }
}