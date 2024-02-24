import User from "../model/User";
import {jwtDecode} from "jwt-decode";

export default class SecurityUtil {

    static TOKEN: string = 'token';
    static currentUser(): User| null {
        let currentUser = null;
        let token = localStorage.getItem(this.TOKEN);
        if (token) {
            currentUser = jwtDecode(token);
        }
        return currentUser;
    }

    static login(username: string | undefined, password: string | undefined) {
        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ItmF2K3ZhdivINio24zYp9io2KfZhtuMIiwiaWF0IjoxNTE2MjM5MDIyfQ.ixGZ_tdHOM6Gns7H6Ym0R2h-HUmyvcGZKf5ukjp_G5c');
        window.location.href = '/';
    }

    static logout() {
        localStorage.removeItem(this.TOKEN)
        window.location.reload();
    }
}