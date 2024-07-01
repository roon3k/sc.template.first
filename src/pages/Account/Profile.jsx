import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import OrdersStore from "../../store/order/OrdersStore";
import Spinner from "../../components/Loaders/Spinner";
import UserStore from "../../store/user/UserStore";
import {icons} from "../../components/icons";
import {ORDERS_ROUTE} from "../../utils/consts";
import {useTelegram} from "../../hooks/useTelegram";


const Profile = observer((props) => {
    const {user} = useTelegram();
    const ordersCount = OrdersStore.count;
    const {phone, bonus} = UserStore
    useEffect(()=>{
        if(!ordersCount){
            OrdersStore.fetchOrders();
        }
    },[ordersCount]);

    if(OrdersStore.isLoading){
        return <Spinner/>
    }
    return (

        <div className={'profile container'}>
            <div className="block-list">
                <div className="block-list__title">
                    Информация о пользователе
                </div>
                <div className="block-list__body">
                    <div className="list">
                        <div className="list__item">
                            <div className="list__item-value list__item-value--icon">
                                {icons.profile}
                                <span>Имя</span>
                            </div>
                            <div className="list__item-value list__item-value--primary">
                                {user?.first_name+" "+user?.last_name}
                            </div>
                        </div>
                        <div className="list__item">
                            <div className="list__item-value list__item-value--icon">
                                {icons.phone}
                                <span>Телефон</span>
                            </div>
                            <div className="list__item-value list__item-value--primary">
                                {phone ? phone : "-"}
                            </div>
                        </div>
                        <div className="list__item">
                            <div className="list__item-value list__item-value--icon">
                                {icons.award}
                                <span>Бонусы</span>
                            </div>
                            <div className="list__item-value list__item-value--primary">
                                {bonus ? bonus : 0}
                            </div>
                        </div>
                        <NavLink to={ORDERS_ROUTE} className="list__item">
                            <div className="list__item-value list__item-value--icon">
                                {icons.orders}
                                <span>Кол-во заказов</span>
                            </div>
                            <div className="list__item-value list__item-value--primary">
                                {ordersCount}
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Profile;