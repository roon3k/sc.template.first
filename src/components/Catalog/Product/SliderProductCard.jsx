import React from 'react';
import {NavLink} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../../utils/consts";
import {icons} from "../../icons";
import cart from "../../../store/cart/CartStore";
import {observer} from "mobx-react-lite";
import placeholderImage from "../../../assets/images/placeholder.jpg"

const SliderProductCard = observer(({hideDescription, product, type, urlRule}) => {
    const cartProducts = cart.products
    let inCart = false,
        cartQuality = 0;
    const skusInCartIds = cartProducts.map(function (item){
        return item.sku_id;
    });

    product.skus.map(function (item){
        if(skusInCartIds.includes(item.id)){
            inCart = true
            cartQuality++;
        }
    });
    return (
        <NavLink to={(urlRule? urlRule:PRODUCT_ROUTE) + `/${product.id}`} className={"products__item "+type} data-id={product.id}>
            <div className={"products__item-image"}>
                <img src={product.image ?product.image.path: placeholderImage} alt={product.title}/>
            </div>
            <div className="products__item-content">
                <div className="products__item-name">
                    {product.title}
                </div>
                <span className="products__item-price">{product?.min_price === 0 ? 'Бесплатно': product?.min_price+ ' ₽'} {inCart ? " · "+cartQuality:""}</span>
            </div>
            <div className={"products__item-button"+ (inCart?  " products__item-button--success": "")}>
                {icons.plus}
            </div>
        </NavLink>
    );
});

export default SliderProductCard;