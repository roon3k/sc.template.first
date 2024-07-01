import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useTelegram} from "../../hooks/useTelegram";
import Spinner from "../../components/Loaders/Spinner";
import BotStore from "../../store/bot/BotStore";


const Policy = observer(() => {
    const {contacts:{policy_text}, isLoading} = BotStore;
    const {initBackButton} = useTelegram();

    useEffect(() => {
        if (!policy_text) {
            BotStore.fetchSettings();
        }
        initBackButton(true, ()=>{history.back()})
        return ()=>{
            initBackButton(false);
        }
    }, []);
    if(isLoading){
        return <Spinner/>
    }
    return (
        <div className="policy container">
            <div className="block-list">
                <div className="block-list__body">
                    <div className="list">
                        <div className="list__item">
                            <div className="policy__text" dangerouslySetInnerHTML={{__html: policy_text}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
export default Policy;