import React from 'react';
import Button from "./Button";
import {icons} from "../icons";

const QuantityControl = ({count, decrementAction, incrementAction}) => {
    const decrement = () =>{
        if(typeof decrementAction !== "undefined"){
            decrementAction()
        }
    }
    const increment = () => {
        if(typeof incrementAction !== "undefined") {
            incrementAction()
        }
    }
    return (
        <div className={"quality-control"}>
            <Button onClick={()=>{decrement()}} className={"quality-control__button"}>{icons.minus}</Button>
            <span className={"quality-control__value"}>{count}</span>
            <Button onClick={()=>{increment()}} className={"quality-control__button"}>{icons.plus}</Button>
        </div>
    );
};

export default QuantityControl;