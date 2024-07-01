import React from 'react';
import QuantityControl from "../Button/QuantityControl";
import Button from "../Button/Button";
import {icons} from "../icons";
import CartStore from "../../store/cart/CartStore";
import {observer} from "mobx-react-lite";

const CartProduct = observer(({product}) => {

    const increment = (sku_id, count) => {
        CartStore.updateProduct(sku_id, count);
    }
    const decrement = (sku_id, count) => {
        if(count > 0){
            CartStore.updateProduct(sku_id, count);
        }else{
            CartStore.deleteProduct(sku_id);
        }
    }
    const deleteProductFromCart = (sku_id) => {
        CartStore.deleteProduct(sku_id);
    }
    return (
        <div className={"cart__item"} data-id={product.id}>
            <img className={"cart__item-image"} src={product.image?.path} alt={product.title}/>
            <div className="cart__item-content">
                <div className="cart__item-name">{product.title}</div>
                <div className="cart__item-name">{product.sku_title}</div>
                <QuantityControl
                    count={product.count}
                    incrementAction={()=>{increment(product.sku_id, product.count+1)}}
                    decrementAction={()=>{decrement(product.sku_id, product.count-1)}}
                />
            </div>
            <div className="cart__item-price">
                {product.price * product.count + ' ₽'}
            </div>
            <button className={'cart__item-remove-button'} onClick={()=>deleteProductFromCart(product.sku_id)}>{icons.close}</button>
        </div>
    );
});

export default CartProduct;