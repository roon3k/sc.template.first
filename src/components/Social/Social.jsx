import React, {useDebugValue} from 'react';
import {Link} from "react-router-dom";
import {icons} from "../icons";

const Social = ({socials}) => {
    return (
        <div className={"socials"}>
            {
                socials.map((item) => {
                    if(item.link){
                        return <Link className={'socials__item'} key={item.name} to={item.link}>{icons[item.name]}</Link>
                    }
                })
            }
        </div>
    );
};

export default Social;