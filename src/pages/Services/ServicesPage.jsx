import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import CategoryList from "../../components/Catalog/Category/CategoryList";
import ServiceCatalogStore from "../../store/catalog/services/ServiceStore";
import ServiceStore from "../../store/catalog/services/ServiceStore";
import ServicesList from "../../components/Catalog/Services/ServicesList";



const ServicesPage = observer(() => {
    const [chooseCategory, setChooseCategory] = useState(null);
    const {items, categories,isLoading} = ServiceStore;



    useEffect(()=>{
        ServiceStore.fetchCategories()
    },[]);

    useEffect(()=>{
        ServiceCatalogStore.setFilter({
            category_id:chooseCategory ? chooseCategory.id : null
        });
        ServiceStore.fetchList()


    },[chooseCategory])

    return (
        <div>
            <CategoryList
                items={categories}
                value={chooseCategory}
                onChange={setChooseCategory}
            />
            <ServicesList
                products={items}
                emptyText={"Услуги не найдены"}
                isLoading={isLoading}
            />
        </div>
    );
});
export default ServicesPage;