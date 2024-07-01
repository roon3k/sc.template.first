import {makeAutoObservable} from "mobx";
import {$api} from "../../http";

class CartStore {
    isLoading = true
    products = []
    quality = 0
    total_price = 0
    constructor(props) {
        makeAutoObservable(this)
    }
    
    async fetchCart() {
        await $api.get(`${localStorage.getItem('bot_id')}/cart`).then(({data})=>{
            this.products = data.data.products;
            this.total_price = data.data.total_price;
            this.quality = data.data.quality;
            this.isLoading = false;
        });

    }
    getItemCartProduct(sku_id){
        return this.products.filter((item)=>item.sku_id === sku_id)[0]
    }

    async addProduct(sku_id, count) {
        await $api.post(`${localStorage.getItem('bot_id')}/cart/${sku_id}`, {count: count}).then(({data})=>{
            if(this.products.filter(item=>item.sku_id === data.data.sku_id).length){
                this.products.map(item=>{
                    if(item.sku_id === data.data.sku_id){
                        item.count = data.data.count;
                    }
                })
            }else{
                this.products = [
                    ...this.products,
                    data.data
                ];
            }

            this._updatePriceCount();
        });

    }
    async deleteProduct(sku_id) {
        await $api.delete(`${localStorage.getItem('bot_id')}/cart/${sku_id}`).then(({data})=>{
            this.products = this.products.filter(item => item.sku_id !== sku_id)
            this._updatePriceCount();
        });

    }

    async updateProduct(sku_id, count) {
        await $api.put(`${localStorage.getItem('bot_id')}/cart/${sku_id}`, {count: count}).then(({data})=>{
            this.products = this.products.map(function (item) {
                if (item.sku_id === sku_id) {
                    item.count = count
                }
                return item;
            });
            this._updatePriceCount();
        });
    }

    getProductCartCount(sku_id){
        const cartProduct = this.products.find(item=>item.sku_id === sku_id);
        return cartProduct ? cartProduct.count : 0;
    }
    _updatePriceCount(){
        this.total_price =  this.products.reduce((acc, item)=>acc+(item?.count*item.price),0);
        this.quality = this.products.reduce((acc, item) =>acc + item?.count, 0);
    }
}

export default new CartStore();