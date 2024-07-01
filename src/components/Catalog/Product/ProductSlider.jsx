import React from 'react';
import {observer} from "mobx-react-lite";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";
import SliderProductCard from "./SliderProductCard";




const ProductSlider = observer(({products, title, urlRule}) => {

    const settings = {
        dots: true,
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    };

    if(products.length){
        return (
            <div className={'popular'}>
                <div className={"popular__header"}>
                    <div className={"popular__title"}>{title}</div>
                </div>
                <Slider {...settings} className={"popular__slider"}>
                    {products.map((item)=>(
                        <div key={item.id} className={'item__slider'}>
                            <SliderProductCard hideDescription={true} product={item} urlRule={urlRule}/>
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
});
export default ProductSlider;