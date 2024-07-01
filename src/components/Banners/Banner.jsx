import React from "react";
import {observer} from "mobx-react-lite";


const Banner = ({id, title, description, image}) => {
    return (
        <div className={'banner'}>
            <img src={image?.path}/>
        </div>
    );
};
export default Banner;