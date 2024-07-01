import React, {Suspense, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner from "./Banner";
import BannersStore from "../../store/banners/BannersStore";
import banner from "./Banner";




const BannersSlider = observer(() => {
    const {banners} = BannersStore;
    const settings = {
        dots: true,
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true
    };
    useEffect(()=>{
        if(!banners.length){
            BannersStore.fetchBanners()
        }
    },[])

    if(banner.length){
        return (
            <div>
                <Slider {...settings} className={"banners__slider"}>
                    {banners.map((item)=>(
                        <div key={item.id} className={'item__slider'}>
                            <Banner {...item}/>
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
});
export default BannersSlider;