import React from 'react';
import {observer} from "mobx-react-lite";

const OrderCard = observer(({object, cancelOrder}) => {
    return (
        <div className={"order-card"}>
            <div className="order-card__header">
                <div className="order-card__title">
                    {object.created_at} #{object.id}
                </div>
                <div className="order-card__price">
                    {object.total_paid + " ₽"}
                </div>
            </div>
            <div className="order-card__body">
                <b className="order-card__info order-card__info--hint">
                    Апартаменты : {object.bookable.title}
                </b>
                <b className="order-card__info order-card__info--hint">
                    Даты бронирования:
                </b>
                <div className="order-card__info order-card__info--hint">
                     {object.starts_at} - {object.ends_at}
                </div>
                <b className="order-card__info order-card__info--hint">
                    Кол-во гостей : {object.bookable.quantity}
                </b>

            </div>
        </div>
    );
});

export default OrderCard;