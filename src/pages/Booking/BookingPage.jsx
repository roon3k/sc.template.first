import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import CategoryList from "../../components/Catalog/Category/CategoryList";
import ApartmentStore from "../../store/booking/apartments/ApartmentStore";
import BookingList from "../../components/Catalog/Booking/BookingList";
import BookingFilter from "../../components/Catalog/Booking/BookingFilter";



const BookingPage = observer(() => {
    const [chooseCategory, setChooseCategory] = useState(null);
    const {items, filter, categories,isLoading} = ApartmentStore;


    useEffect(()=>{
        ApartmentStore.fetchCategories()
    },[]);

    useEffect(()=>{
        ApartmentStore.setFilter({
            category_id:chooseCategory ? chooseCategory.id : null
        });
        ApartmentStore.fetchList()


    },[chooseCategory])


    const setFilter = (startDate, endDate, person) =>{
        ApartmentStore.setFilter({
            ...filter,
            quantity:person,
            date_start:startDate,
            date_end:endDate,
        })
        ApartmentStore.fetchList();
    }

    return (
        <div>
            <CategoryList
                items={categories}
                value={chooseCategory}
                onChange={setChooseCategory}
            />
            <BookingList
                items={items}
                emptyText={"Апартаменты не найдены"}
                isLoading={isLoading}
            />
            <BookingFilter onSubmit={setFilter} {...filter}/>
        </div>
    );
});
export default BookingPage;