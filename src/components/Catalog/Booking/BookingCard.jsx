import React from 'react';
import {NavLink} from "react-router-dom";
import {icons} from "../../icons";
import {observer} from "mobx-react-lite";
import placeholderImage from "../../../assets/images/placeholder.jpg"
import {BOOKING_ROUTE} from "../../../utils/consts";

const BookingCard = observer(({item, type}) => {
    const description = item.description ? item.description.slice(0, 120) : "";
    return (
        <NavLink to={BOOKING_ROUTE + `/${item.id}`} className={"products__item "+type} data-id={item.id}>
            <div className={"products__item-image"}>
                <img src={item.image ?item.image.path: placeholderImage} alt={item.title}/>
            </div>
            <div className="products__item-content">
                <div className="products__item-name">
                    {item.title}
                </div>
                <div className="products__item-description" dangerouslySetInnerHTML={{__html: description}}></div>
                <span className="products__item-price">{item?.price + ' ₽'}</span>
            </div>
            <div className={"products__item-button"}>
                {icons.plus}
            </div>
        </NavLink>
    );
});

export default BookingCard;