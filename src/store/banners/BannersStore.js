import {makeAutoObservable} from "mobx";
import {$api} from "../../http";

class BannerStore {
    isLoading= true
    banners = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetchBanners() {
        await $api.get(`${localStorage.getItem('bot_id')}/banners`).then(({data})=>{
            this.isLoading = false;
            this.banners = data.data;
        });

    }
}
export default new BannerStore();