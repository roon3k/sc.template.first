import React, {useEffect} from 'react';
import {icons} from "../icons";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import BotStore from "../../store/bot/BotStore";

const BarContactsPanel = observer(() => {

    useEffect(()=>{
        if(BotStore.isLoading){
            BotStore.fetchSettings()
        }
    },[]);
    return (
        <NavLink to={'/contacts'} className={'bar-contacts'}>
            <div className="bar-contacts__content">
                <div className="bar-contacts__title">
                    {BotStore.info.phone ? BotStore.info.phone : "Наши контакты"}
                </div>
                <div className="bar-contacts__subtitle">
                    {BotStore.info.address}
                </div>
            </div>
            {icons.arrow_right_2}
        </NavLink>
    );
});

export default BarContactsPanel;