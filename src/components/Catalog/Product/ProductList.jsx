import React from 'react';
import uuid from "react-uuid";
import ProductCard from "./ProductCard";
import Spinner from "../../Loaders/Spinner";

const ProductList = ({products, emptyText, type, isLoading}) => {

    if (!products?.length && !isLoading) {
        return (<div className={'empty'}>{emptyText}</div>);
    }
    if(isLoading){
        return <Spinner/>
    }
    return (
        <div className={'container'}>
            <div className={'products'}>
                {isLoading ?
                    <Spinner/>
                    :
                    <div className={'products__list ' + type}>
                        {
                            products.map(item => (
                                <ProductCard
                                    type={type}
                                    key={item.id}
                                    product={item}
                                />
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductList;