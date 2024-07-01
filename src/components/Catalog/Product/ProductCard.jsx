import React from 'react';
import {NavLink} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../../utils/consts";
import {icons} from "../../icons";
import cart from "../../../store/cart/CartStore";
import {observer} from "mobx-react-lite";
import placeholderImage from "../../../assets/images/placeholder.jpg"
import uuid from "react-uuid";
import Badges from "../../Common/badges";

const ProductCard = observer(({singlePageRoute, product, type}) => {
    const cartProducts = cart.products
    let inCart = false,
        cartQuality = 0;
    const skusInCartIds = cartProducts.map(function (item) {
        return item.sku_id;
    });

    product.skus.map(function (item) {
        if (skusInCartIds.includes(item.id)) {
            inCart = true
            cartQuality++;
        }
    });
    const description = product.description ? product.description.slice(0, 120) : "";
    return (
        <NavLink to={PRODUCT_ROUTE + `/${product.id}`} className={"products__item " + type} data-id={product.id}>
            <div className={"products__item-image"}>
                <Badges items={product.labels}/>
                <img src={product.image ? product.image.path : placeholderImage} alt={product.title}/>
            </div>
            <div className="products__item-content">
                <div>
                    <div className="products__item-name">
                        {product.title}
                    </div>
                    {
                        product.skus.length > 1 ?
                            <div className="products__item-subname">
                                {product.skus.map((item) => (<span key={uuid()}>{item.title}</span>))}
                            </div>
                            : null
                    }
                    <div className="products__item-description" dangerouslySetInnerHTML={{__html: description}}></div>
                </div>
                <span
                    className="products__item-price">{product?.min_price === 0 ? 'Бесплатно' : product?.min_price + ' ₽'} {inCart ? " · " + cartQuality : ""}</span>
            </div>
            <div className={"products__item-button" + (inCart ? " products__item-button--success" : "")}>
                {icons.arrow_right_3}
            </div>
        </NavLink>
    );
});

export default ProductCard;