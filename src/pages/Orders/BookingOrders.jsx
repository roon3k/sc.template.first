import React, {useEffect} from 'react';
import OrdersStore from "../../store/order/OrdersStore";
import {observer} from "mobx-react-lite";
import OrderCard from "../../components/Order/OrderCard";
import Spinner from "../../components/Loaders/Spinner";
import {icons} from "../../components/icons";
import BookingStore from "../../store/booking/booking/BookingStore";
import BookingOrderCard from "../../components/Order/BookingOrderCard";



const Orders = observer(() => {
    const {orders, isLoading} = BookingStore;
    useEffect(()=>{
        BookingStore.fetchBookingOrders();
    },[]);

    if(isLoading){
        return <Spinner/>
    }
    return (
        <div className="orders">
            {orders.length ?
                <div className="orders__list">
                    {
                        orders.map((order)=>(
                            <BookingOrderCard key={order.id} object={order}/>
                        ))
                    }
                </div>
            :
                <div className={'empty opacity-4'}>
                    {icons.cart}
                    <div className="empty__text">
                        У вас пока нет бронирований
                    </div>
                </div>
            }
        </div>
    );
});
export default Orders;