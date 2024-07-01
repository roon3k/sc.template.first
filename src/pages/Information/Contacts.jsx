import React, {useEffect} from 'react';
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import {NavLink} from "react-router-dom";
import Social from "../../components/Social/Social";
import {POLICY_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import Spinner from "../../components/Loaders/Spinner";
import BotStore from "../../store/bot/BotStore";


const Contacts = observer(() => {
    const info = BotStore.contacts;

    useEffect(() => {
        if (BotStore.isLoading) {
            BotStore.fetchSettings()
        }
    }, [])
    let defaultState = null;

    if (info.geo_lat && info.geo_lon) {
        defaultState = {
            center: [info.geo_lat, info.geo_lon],
            zoom: 12,
        };
    }
    let socials = [];
    if (info?.vk) {
        socials.push({name: 'vk', link: info.vk});
    }
    if (info?.instagram) {
        socials.push({name: 'instagram', link: info.instagram});
    }
    if (info?.youtube) {
        socials.push({name: 'youtube', link: info.youtube});
    }
    if (BotStore.isLoading) {
        return <Spinner/>
    }
    return (
        <div className={'contacts container'}>
            <div className="contacts__map">
                {
                    defaultState ?
                        <YMaps>
                            <Map defaultState={defaultState} width={'100%'} height={'40vh'}>
                                <Placemark geometry={[info.geo_lat, info.geo_lon]}/>
                            </Map>
                        </YMaps> : ""
                }
            </div>

            <div className="block-list">
                <div className="block-list__title">
                    Информация о пользователе
                </div>
                <div className="block-list__body">
                    <div className="list">
                        {
                            info.address ?
                                <div className="list__item">
                                    <div className="list__item-value">
                                        {info.address}
                                    </div>
                                </div>
                                : null
                        }
                        <div className="list__item">
                            <div className="list__item-value">
                                <span>Телефон</span>
                            </div>
                            <div className="list__item-value list__item-value--primary">
                                {info.phone ? info.phone : '-'}
                            </div>
                        </div>
                        <div className="list__item">
                            <div className="list__item-value">
                                <span>Email</span>
                            </div>
                            <div className="list__item-value list__item-value--primary">
                                {info.email ? info.email : '-'}
                            </div>
                        </div>
                        <div className="list__item">
                            <div className="list__item-value">
                                <span>Web-сайт</span>
                            </div>
                            <div className="list__item-value list__item-value--primary">
                                {info.site ? info.site : '-'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                socials.length ?
                    <div className="block-list">
                        <div className="block-list__title">
                            Социальные сети
                        </div>
                        <div className="block-list__body">
                            <Social socials={socials}/>
                        </div>
                    </div>
                    : null
            }
            {
                info?.policy_text?.length ?
                    <NavLink to={POLICY_ROUTE} className="contacts__button">Политика конфиденциальности</NavLink>
                    : null
            }
        </div>
    );
});

export default Contacts;