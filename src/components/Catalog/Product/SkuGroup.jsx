import React from 'react';
import {observer} from "mobx-react-lite";

const SkuGroup = observer(({label,elements,type,value,setValue}) => {

    if(!elements || !elements?.length){
        return (
            <></>
        );
    }
    return (
        <div className={"radio-group"}>
            {
                elements.map((item, key) => (
                    <label key={item.id}>
                        <input
                            type={type}
                            checked={value?.id === item.id}
                            value={item}
                            onChange={()=>setValue(item)}
                            disabled={!item.is_available && item.use_stock}
                        />
                        <span className={"radio-group__item"}>
                            <div className={"radio-group__label"}>{item.title}
                                {
                                    item.is_available && item.use_stock ?
                                    <small>  (остаток {item.stock}) </small>
                                    :
                                    ""
                                }
                            </div>
                            <div className={"radio-group__value"}>{item.price + " ₽"}</div>
                        </span>
                    </label>
                ))
            }
        </div>
    );
});

export default SkuGroup;