import React, {useState} from "react";
import {icons} from "../icons";

const BottomWidget = ({title, children}) => {
    const [openFilter, setOpen] = useState(false);
    return (
        <div className={'bottom-widget '+(openFilter? "open":"")}>
            <div className={'bottom-widget__header '} onClick={()=>{setOpen(!openFilter)}}>
                {title} {icons.backward}
            </div>
            <div className={'bottom-widget__body'}>
                {children}
            </div>
        </div>
    );
}
export default BottomWidget;