import React, {useEffect} from 'react';
import OrdersStore from "../../store/order/OrdersStore";
import {observer} from "mobx-react-lite";
import OrderCard from "../../components/Order/OrderCard";
import Spinner from "../../components/Loaders/Spinner";
import {icons} from "../../components/icons";



const Orders = observer(() => {
    const {orders, isLoading} = OrdersStore;
    useEffect(()=>{
        OrdersStore.fetchOrders();
    },[]);

    const cancelOrder = (order) =>{
        OrdersStore.cancelOrder(order.id)
    }
    if(isLoading){
        return <Spinner/>
    }
    return (
        <div className="orders">
            {orders.length ?
                <div className="orders__list">
                    {
                        orders.map((order)=>(
                            <OrderCard key={order.id} object={order} cancelOrder={cancelOrder}/>
                        ))
                    }
                </div>
            :
                <div className={'empty opacity-4'}>
                    {icons.cart}
                    <div className="empty__text">
                        У вас пока что нет заказов
                    </div>
                </div>
            }
        </div>
    );
});
export default Orders;