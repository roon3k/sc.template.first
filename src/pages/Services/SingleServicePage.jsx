import React, {useEffect, useState} from 'react';
import {ReactSVG} from "react-svg";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import placeholderImage from "../../assets/images/placeholder.jpg"
import CartStore from "../../store/cart/CartStore";
import Spinner from "../../components/Loaders/Spinner";
import {useTelegram} from "../../hooks/useTelegram";
import Badges from "../../components/Common/badges";
import ServiceStore from "../../store/catalog/services/ServiceStore";
import SkuGroup from "../../components/Catalog/Product/SkuGroup";
import Button from "../../components/Button/Button";
import {CART_ROUTE} from "../../utils/consts";
import ImageSlider from "../../components/Common/imageSlider";


const SingleServicePage = observer((props) => {
    const {id} = useParams();
    const [selectedSku, setSelectedSku] = useState(null);
    const {initBackButton, showMainButton} = useTelegram();
    const {item, isLoading} = ServiceStore;
    const navigate = useNavigate();


    useEffect(() => {
        showMainButton({is_visible: false});
        initBackButton(true, () => {
            history.back()
        })
        return () => {
            initBackButton(false);
        }
    }, [])


    useEffect(() => {
        CartStore.fetchCart()
            .then(() => ServiceStore.fetchItem(id)
                .then(() => {
                    setSelectedSku(ServiceStore.item.skus[0]);
                }));

        return () => {
            ServiceStore.unsetItem();
        }
    }, [id]);



    const addToCart = (selectedSku, count) =>{
        CartStore.addProduct(selectedSku.id, count).then(() => {
            navigate(CART_ROUTE)
        });
    }

    if (isLoading || !item?.id) {
        return <Spinner/>
    }
    return (
        <div className={'product-item'} key={item.id}>
            <Badges items={item.labels}/>
            <div className="product-item__image">
                <ImageSlider images={item.gallery}/>
            </div>
            <div className="product-item__content">
                <div className="product-item__content-body">
                    <div className="product-item__title">
                        {item.title}
                    </div>


                    <SkuGroup
                        label={"Выберите"}
                        type={"radio"}
                        elements={item.skus}
                        value={selectedSku}
                        setValue={setSelectedSku}
                    />
                    <div className="product-item__description"
                         dangerouslySetInnerHTML={{__html: item.description}}></div>
                </div>
                <div className="product-item__content-footer">
                    <div className="button-group button-group--1">
                        <Button className={"button-group__button"} onClick={()=>addToCart(selectedSku, 1)}>Оформить заказ {selectedSku?.price * 1 + " ₽"}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
});
export default SingleServicePage;

