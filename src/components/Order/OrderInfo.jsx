import React from 'react';

const OrderInfo = ({totalPrice, deliveryPrice, payBonusSum}) => {
    return (
        <div className={"order-info"}>
            <div className={"order-info__item"}>
                <span>Стоимость</span>
                <span>{totalPrice ? totalPrice+ " ₽": "Бесплатно"}</span>
            </div>
            {payBonusSum ?
                <div className={"order-info__item"}>
                    <span>Оплата бонусами</span>
                    <span>{payBonusSum ? payBonusSum+ " ₽": "-"}</span>
                </div>
                :null}
            <div className={"order-info__item"}>
                <span>Доставка</span>
                <span>{deliveryPrice ? deliveryPrice+ " ₽": "Бесплатно"}</span>
            </div>
            <div className={"order-info__item"}>
                <span>Итого</span>
                <span>{deliveryPrice || totalPrice ? (totalPrice+deliveryPrice - payBonusSum)+ " ₽": "-"}</span>
            </div>
        </div>
    );
};

export default OrderInfo;