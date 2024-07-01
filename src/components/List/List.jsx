import React from 'react';
import uuid from "react-uuid";

const List = (props) => {

    return (
        <ul className={'list-info'}>
            {props.list.map(item => (
                <li key={uuid()}>
                    <span>{item.name}</span>
                    <span>{item.value}</span>
                </li>
            ))}
        </ul>
    );
};

export default List;