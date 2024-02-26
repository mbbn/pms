import BaseService from "./BaseService";

export default class SecurityService extends BaseService {

    login(username: string, password: string): Promise<Response> {
        return super.post('/api/login',{
            "username": username,
            "password": password,
        });
    }

    logout(): Promise<Response> {
        return super.get('/api/logout');
    }
}