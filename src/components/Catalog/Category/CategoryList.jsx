import React from 'react';

const CategoryList = ({items, value, onChange}) => {
    return (
        <div className={'category-list'}>
            <div className={'category-list__wrapper'}>
                <div onClick={()=>{onChange(null)}} className={'category-list__item '+(!value ? "active": "")}>
                    <span>Все</span>
                </div>
                {items.length > 0 ?
                    items.map((item) => (
                        <div key={item.id} onClick={()=>{onChange(item)}} className={'category-list__item '+(item === value ? "active": "")}>
                            <span>{item.name}</span>
                        </div>
                    ))
                    :null
                }
            </div>
        </div>
    );
}

export default CategoryList;