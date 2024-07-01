import React from 'react';
import {observer} from "mobx-react-lite";

const OrderCard = observer(({object, cancelOrder}) => {
    return (
        <div className={"order-card"}>
            <div className="order-card__header">
                <div className="order-card__title">
                    {object.created_at} #{object.id}
                </div>
                <div className={"order-card__status order-card__status--"+object.status.color}>
                    {object.status.name}
                </div>
            </div>
            <div className="order-card__body">
                <div className="order-card__info order-card__info--hint">
                    {object.shipping_method.slug === "pickup" || object.shipping_method.slug === "inhouse" ?
                        object.shipping_method.name
                        :
                        'Куда доставить: '+object?.shipping_address
                    }
                </div>
                {
                    object.shipping_name ?
                        <div className="order-card__info order-card__info--hint">
                            Имя получателя: {object.shipping_name}
                        </div>
                        :
                        ""
                }

                <div className="order-card__info">
                    <ul>
                        {
                            object.products.map(product=>(<li key={product.id}>{product.quality+' шт.'} - {product.name}</li>))
                        }
                    </ul>
                </div>
            </div>
            <div className="order-card__footer">
                <div className="order-card__controls">
                    {["in_work", "new"].includes(object.status.slug) ?
                        <span className={'text-danger'} onClick={()=>cancelOrder(object)}>Отменить заказ</span>
                    :
                        ""
                    }
                </div>
                <div className="order-card__price">
                    {(object.order_price + object.delivery_price) === 0 ? "Бесплатно": (object.order_price + object.delivery_price) + " ₽"}
                </div>
            </div>
        </div>
    );
});

export default OrderCard;