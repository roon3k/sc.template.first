import {action, makeAutoObservable} from "mobx";
import {$api} from "../../http";

class OrderSettingsStore {
    isLoading= true
    fix_shipping_price = null
    min_order_price = null
    shippingMethods=[]
    paymentsMethods=[]
    pickupPaymentsMethods=[]
    price_type= {
        slug: null,
        name: null
    }
    loyalty = {
        active: false,
        available_bonus_payments: 0
    }

    constructor() {
        makeAutoObservable(this)
    }

    async fetchShippingMethods() {
        await $api.get(`${localStorage.getItem('bot_id')}/setting/shipping`).then(({data})=>{
            this.isLoading = false;
            this.fix_shipping_price = data.data.fix_shipping_price;
            this.min_order_price = data.data.min_order_price;
            this.shippingMethods = data.data.methods;
            this.paymentsMethods = data.data.payments;
            this.pickupPaymentsMethods = data.data.pickup_payments;
            this.price_type = data.data.price_type;
            this.loyalty = data.data.loyalty

        });
    }


}
export default new OrderSettingsStore();