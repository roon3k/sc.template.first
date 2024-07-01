import UserStore from "../store/user/UserStore";
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import ShopLoader from "./Loaders/ShopLoader";
import {useTelegram} from "../hooks/useTelegram";
import {observer} from "mobx-react-lite";
import BotStore from "../store/bot/BotStore";

const Page = observer(({showTopPanel, showBottomPanel, navType, element}) => {
    const {isAuth, isLoading} = UserStore;
    const {user} = useTelegram()
    const params = useParams();

    //prod
    let user_id= user ? user.id : null;
    let bot_id = params?.bot_id ? params.bot_id : null;
    //dev
    if(process.env.REACT_APP_MODE==="dev"){
        user_id = 5467763995;
        // bot_id = 5848850433;
    }


    useEffect(()=>{
        UserStore.login(bot_id, user_id).then(()=>{
            BotStore.fetchSettings()
        })
    },[isAuth]);

    if(!isAuth || isLoading){
        return (
            <>
                <ShopLoader/>
            </>
        );
    }

    return (
        <div className={"page"}>
            {element}
        </div>
    );
});

export default Page;
