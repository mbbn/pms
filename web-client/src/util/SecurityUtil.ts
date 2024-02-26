import User from "../model/User";
import {jwtDecode} from "jwt-decode";
import SecurityService from "../service/SecurityService";

export default class SecurityUtil {

    static INSTANCE: SecurityUtil = new SecurityUtil();
    private _TOKEN: string = 'token';
    private securityService: SecurityService;

    constructor() {
        this.securityService = new SecurityService();
    }

    static currentUser(): User| null {
        let currentUser = null;
        let token = localStorage.getItem(SecurityUtil.INSTANCE._TOKEN);
        if (token) {
            currentUser = jwtDecode(token);
        }
        return currentUser;
    }

    static login(username: string | undefined, password: string | undefined) {
        let instance = SecurityUtil.INSTANCE;
        if (typeof username === "string" && typeof password === "string") {
            instance.securityService.login(username, password).then(resp => {
                if(resp && typeof resp.access_token !== undefined){
                    let access_token:string = resp.access_token;
                    localStorage.setItem(SecurityUtil.INSTANCE._TOKEN, access_token);
                    window.location.href = '/';
                }
            });
        }
    }

    static logout() {
        let instance = SecurityUtil.INSTANCE;
        // instance.securityService.logout().then(resp => {
            localStorage.removeItem(SecurityUtil.INSTANCE._TOKEN)
            window.location.reload();
        // });
    }
}