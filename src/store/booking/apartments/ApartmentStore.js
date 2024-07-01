import {makeAutoObservable} from "mobx";
import {$api} from "../../../http";

class ApartmentStore {
    isLoading= true
    items= []
    filter = {
        category_id:null,
        quantity:null,
        date_start:null,
        date_end:null,

    }
    categories = []
    item = {
        id:null,
        image:null,
        title:null,
        description:null,
        category:null,
        price:null,
        quantity:null,
        not_available_dates:[],
    }

    constructor() {
        makeAutoObservable(this)
    }

    async fetchList() {
        this.isLoading = true;
        let searchParams = {};

        if(this.filter.category_id){
            searchParams.category_id = this.filter.category_id;
        }
        if(this.filter.quantity){
            searchParams.quantity = this.filter.quantity;
        }
        if(this.filter.date_start){
            let date_start = new Date(this.filter.date_start);
            date_start = new Intl.DateTimeFormat('ru-Ru').format(date_start)
            searchParams.date_start = date_start;
        }
        if(this.filter.date_end){
            let date_end = new Date(this.filter.date_end);
            date_end = new Intl.DateTimeFormat('ru-Ru').format(date_end)
            searchParams.date_end = date_end;
        }
        const getRequest = new URLSearchParams(searchParams);

        await $api.get(`${localStorage.getItem('bot_id')}/apartments?${getRequest.toString()}`).then(({data})=>{
            this.isLoading = false;
            this.items = data.data;
        });
    }
    async fetchCategories(){
        this.isLoading = true;
        await $api.get(`${localStorage.getItem('bot_id')}/categories/booking`).then(({data}) => {
            this.isLoading = false;
            this.categories = data.data;
        });
    }

    setFilter(filter){
        this.filter = {
            ...this.filter,
            ...filter
        }
    }

    async fetchItem(product_id) {
        this.isLoading = true;
        await $api.get(`${localStorage.getItem('bot_id')}/apartments/${product_id}`).then(({data})=>{
            this.isLoading = false;
            this.item = {
                ...data.data,
            }
        });
    }
    async unsetApartment(){
        this.item = {
            id:null,
            image:null,
            title:null,
            description:null,
            category:null,
            price:null,
            skus:null,
        }
    }

}
export default new ApartmentStore();