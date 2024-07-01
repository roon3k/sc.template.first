import uuid from "react-uuid";

const Badges = ({items}) => {
    if(!items) return(<></>);
    return (
        <div className={'labels'}>
            {items.map(({text, color})=>
                <div key={uuid()} className={'badge'} style={{backgroundColor: color}}>
                    {text}
                </div>
            )}
        </div>
    );
}
export default Badges;
