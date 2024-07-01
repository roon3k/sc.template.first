import {makeAutoObservable} from "mobx";
import {$api} from "../../http";

class OrderStore {
    isLoading= true
    orders = []
    count =  0
    constructor() {
        makeAutoObservable(this)
    }

    async fetchOrders() {
        await $api.get(`${localStorage.getItem('bot_id')}/orders`).then(({data})=>{
            this.isLoading = false;
            this.orders = data.data
            this.count = data.data.length
        });
    }

    async cancelOrder(order_id){
        await $api.put(`${localStorage.getItem('bot_id')}/order/${order_id}/cancel`).then(({data})=>{
            this.orders = this.orders.filter((item)=>{
                if(item.id === data.data.id){
                    item.status =  data.data.status;
                }
                return item;
            })
        });
    }
    async createOrder(orderData){
        await $api.post(`${localStorage.getItem('bot_id')}/create-order`, {...orderData})
    }


}
export default new OrderStore();