import {action, makeAutoObservable} from "mobx";
import axios from "axios";
import {$api} from "../../http";

class UserStore {
    isAuth = false
    isLoading = true
    botId = null
    id = null
    phone = null
    bonus = 0
    errors=null
    constructor() {
        makeAutoObservable(this)
    }
    
    async login(bot_id, user_id) {
        await $api.get(`${process.env.REACT_APP_API_URL}${bot_id}/auth/login?user_id=${user_id}`).then(({data})=>{
            this.setErrors({name:"Auth user:", data:data})
            localStorage.setItem("bot_id", bot_id);
            localStorage.setItem("accessToken", data.data.token);
            localStorage.setItem("refreshToken", data.data.refresh_token);
            this.isAuth = true;
            this.isLoading = false;
            this.botId = bot_id;
            this.id = user_id;
            this.phone = data.data.profile.phone
            this.bonus = data.data.profile.bonus
        })
    }
    
    check(){
        this.isAuth= true;
        this.isLoading = false;
    }
    logout(){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        this.isAuth=false;
    }
    setErrors (errors) {
        this.errors +=  JSON.stringify(errors, null, " ")
    }
}
export default new UserStore();