import React from 'react';
import uuid from "react-uuid";
import BookingCard from "./BookingCard";

const BookingList = ({items, emptyText, type}) => {
    if(!items?.length){
        return (<></>);
    }
    return (
        <div className={'products'}>
            <div className={'products__list '+type}>
                {items.length > 0 ?
                    items.map(item => (
                        <BookingCard
                            type={type}
                            key={item.id}
                            item={item}
                        />
                    ))
                :
                  <div>
                      {emptyText}
                  </div>
                }
            </div>
        </div>
    );
};

export default BookingList;