import {makeAutoObservable} from "mobx";
import {$api} from "../../../http";

class BookingStore {
    isLoading = true
    orders = []
    count = 0

    constructor() {
        makeAutoObservable(this)
    }

    async fetchBookingOrders() {
        await $api.get(`${localStorage.getItem('bot_id')}/booking/orders`).then(({data}) => {
            this.isLoading = false;
            this.orders = data.data
            this.count = data.data.length
        });
    }

    async booking(apartment_id,starts_at, ends_at, persons) {

        const date_start = new Date(starts_at),
            date_end = new Date(ends_at),
            orderData = {
                apartment_id:+apartment_id,
                date_start: new Intl.DateTimeFormat('ru-Ru').format(date_start),
                date_end: new Intl.DateTimeFormat('ru-Ru').format(date_end),
                quantity: persons
            };
        return await $api.post(`${localStorage.getItem('bot_id')}/booking/make`, {...orderData})
    }

}

export default new BookingStore();