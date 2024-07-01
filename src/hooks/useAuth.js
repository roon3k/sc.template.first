const tg = window.Telegram.WebApp;
export function useAuth(){

    const getBotId = () =>{
        return localStorage.getItem("bot_id");
    }
    const checkCredential = (bot_id) => {
        return !!(checkBot(bot_id) && localStorage.getItem("accessToken"));
    }

    const checkBot = (bot_id) => {
        if(localStorage.getItem("bot_id") && localStorage.getItem("bot_id") === bot_id){
            return true;
        }else if(bot_id){
            _setBot(bot_id)
        }
    };
    const _setBot = (bot_id) => {
        if(bot_id){
            localStorage.setItem("bot_id", bot_id);
            return true;
        }else{
            return false;
        }
    };



    return {
        checkCredential,
        checkBot,
        getBotId
    }
}

