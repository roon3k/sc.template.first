import {action, makeAutoObservable} from "mobx";
import {$api} from "../../http";

class BotStore {
    isLoading = true
    contacts = {
        address: null,
        email: null,
        geo_lat: null,
        geo_lon: null,
        instagram: null,
        phone: null,
        policy_text: null,
        site: null,
        vk: null,
        youtube: null,
    }
    loyalty = {
        active: false,
        available_bonus_payments: 0,
        cashback: 0
    }
    modules = {}

    delivery = {
        delivery_fix_price: 0,
        delivery_km_price:0,
        min_order_price: 0,
        price_type:null,
        delivery_methods:[],
        delivery_paying_methods:[],
        pickup_paying_methods:[]
    }

    constructor() {
        makeAutoObservable(this)
    }

    async fetchSettings() {
        await $api.get(`${localStorage.getItem('bot_id')}/settings`).then(({data}) => {
            this.isLoading = false
            this.contacts = {...data.data.contacts};
            this.loyalty = {...data.data.loyalty};
            this.modules = {...data.data.modules};
            this.delivery = {...data.data.delivery};
        });

    }
}

export default new BotStore();