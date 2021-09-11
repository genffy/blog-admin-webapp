import { User, SystemInfo } from "types/shared";

/**
 * Auth
 */
class Auth {
    SysConfig: SystemInfo | {} = {};
    token = window.SysConfig?.token;
    userInfo:User = {};
    constructor() {
        this.SysConfig = {
            userInfo: {},
            options: {"title":"无聊里找点有聊的","two_factor_auth":false,"password_salt":"firekylin"},
            config: {
              disallow_file_edit: false
            }
        }
        const sUserInfo = localStorage.getItem('user');
        if(sUserInfo) {
            this.userInfo = JSON.parse(sUserInfo);
        }
    }
    checkLogin(): boolean {
        const user = this.userInfo;
        if (user && user.name) {
            return true;
        }
        return false;
    }
}

export const auth = new Auth();