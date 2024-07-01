import {useState} from 'react';



const Tabs = ({items, value}) => {
    const [ active, setActive ] = useState(0);

    const openTab = e => setActive(+e.target.dataset.index);

    return (
        <div>
            <div className="tab">
                <div className={"tab__header tab__header--"+items.length}>
                {items.map((n, i) => (
                    <div
                        key={i}
                        className={`tab__header-item  ${i === active ? 'active' : ''}`}
                        onClick={openTab}
                        data-index={i}
                    >{n.title}</div>
                ))}
                </div>
            </div>
            {items[active] && <TabContent {...items[active]} />}
        </div>
    );
}
const TabContent = ({ title, content }) => (
    <div className="tab__content">
        <h3>{title}</h3>
        {content}
    </div>
);
export default Tabs;