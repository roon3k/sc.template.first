import React from 'react';
import ServiceCard from "./ServiceCard";
import Spinner from "../../Loaders/Spinner";

const ServicesList = ({products, emptyText, type, isLoading}) => {
    if (!products?.length) {
        return (<div className={'empty'}>{emptyText}</div>);
    }
    if(isLoading){
        return <Spinner/>
    }
    return (
        <div className={'products'}>
            <div className={'products__list '+type}>
                {products.length > 0 ?
                    products.map(item => (
                        <ServiceCard
                            type={type}
                            key={item.id}
                            product={item}
                        />
                    ))
                :
                  <div>
                      {emptyText}
                  </div>
                }
            </div>
        </div>
    );
};

export default ServicesList;