import {makeAutoObservable} from "mobx";
import {$api} from "../../../http";

class ProductStore {
    isLoading= true
    items= []
    popular = []
    filter = {
        category_id:null
    }
    categories = []
    item = {
        id:null,
        mainImage:null,
        gallery:[],
        title:null,
        description:null,
        category:null,
        price:null,
        skus:[],
    }

    constructor() {
        makeAutoObservable(this)
    }
    
    async fetchList() {
        this.isLoading = true;
        let getRequest = "";
        if(this.filter.category_id){
            getRequest = `?category_id=${this.filter.category_id}`;
        }
        await $api.get(`${localStorage.getItem('bot_id')}/products${getRequest}`).then(({data})=>{
            this.isLoading = false;
            this.items = data.data;
            this.popular = this.items.filter((item)=>{if(item.popular) return item});
        });
    }

    async fetchItem(product_id) {
        this.isLoading = true;
        await $api.get(`${localStorage.getItem('bot_id')}/product/${product_id}`).then(({data})=>{
            this.isLoading = false;
            this.item = {
                ...data.data,
            }
        });
    }
    async unsetItem(){
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

    async fetchCategories(){
        this.isLoading = true;
        await $api.get(`${localStorage.getItem('bot_id')}/categories/products`).then(({data}) => {
            this.isLoading = false;
            this.categories = data.data;
        });
    }
    unsetCategories() {
        this.categories = [];
    }

    setFilter(filter){
        this.filter = {
            ...this.filter,
            ...filter
        }
    }

}
export default new ProductStore();