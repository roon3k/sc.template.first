import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import placeholderImage from "../../assets/images/placeholder.jpg"
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import ApartmentStore from "../../store/booking/apartments/ApartmentStore";
import {useTelegram} from "../../hooks/useTelegram";
import BookingStore from "../../store/booking/booking/BookingStore";
import Spinner from "../../components/Loaders/Spinner";
import BottomWidget from "../../components/Widgets/BottomWidget";
import Select from "../../components/Form/Select";
import ImageSlider from "../../components/Common/imageSlider";


const SingleBookingPage = observer((props) => {
    registerLocale('ru', ru)
    const {id} = useParams();
    const {item, isLoading} = ApartmentStore
    const {initBackButton} = useTelegram();
    const [person, setPerson] = useState(1);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const persons = [];
    const {showTelegramAlert, closeApp} = useTelegram()




    for(let i = 1; i<5; i++){
        persons.push(i)
    }
    useEffect(() => {
        initBackButton(true, () => {
            history.back()
        })
        ApartmentStore.fetchItem(id)
        return () => {
            initBackButton(false);
        }
    }, [])
    const makeBooking = (apartment_id, startDate, endDate, person) => {
        BookingStore.booking(apartment_id, startDate, endDate, person).then((response)=>{
            if(response.status === 420){
                if(process.env.REACT_APP_MODE==="dev"){
                    alert("Бронирование для выбранных вами дат недоступно");
                }else{
                    showTelegramAlert("Бронирование для выбранных вами дат недоступно")
                }
            }else {
                if(process.env.REACT_APP_MODE==="dev"){
                    alert("Апартаменты успешно забронированы")
                }else{
                    showTelegramAlert("Апартаменты успешно забронированы", closeApp)
                }
            }
            ApartmentStore.fetchApartment(apartment_id)
        })
    }

    let excludeDates = [];
    item.not_available_dates.forEach((item)=>{
        excludeDates.push(new Date(item))
    });

    if (isLoading) {
        return <Spinner/>
    }
    return (
        <div className={'product-item'} key={item.id}>
            <div className="product-item__image">
                <ImageSlider images={item.gallery}/>
            </div>
            <div className="product-item__content">
                <div className="product-item__content-body">
                    <div className="product-item__title">
                        {item.title}
                    </div>

                    <div className="product-item__row">
                        <div className="product-item__variables">
                            <div className="product-item__variables-item">
                                Вместимость <small>{item.quantity}</small> человек
                            </div>
                        </div>
                        <span className="product-item__price">
                            {item.price + ' ₽'}
                        </span>
                    </div>
                    <div className="product-item__row">
                    </div>
                    {
                        item.description ?
                            <div className="product-item__panel">
                                <label>Описание</label>
                            </div>
                            :
                            null
                    }
                    <div className="product-item__description"
                         dangerouslySetInnerHTML={{__html: item.description}}></div>
                </div>
            </div>
            <BottomWidget title={'Выбрать свободные даты'}>
                <DatePicker
                    selected={startDate}
                    minDate={new Date()}
                    placeholderText={'Выберите даты'}
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd.MM.yyyy"
                    locale="ru"
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    excludeDates={excludeDates}
                    customInput={<input className={'input'}/>}
                    withPortal


                />
                <Select
                    label={'Кол-во человек'}
                    name={'quantity'}
                    items={persons}
                    required={true}
                    value={person}
                    onChange={setPerson}
                />
                <button className="button bottom-widget__button" onClick={()=>{makeBooking(id, startDate, endDate, person)}}>Забронировать</button>
            </BottomWidget>
        </div>
    );
});
export default SingleBookingPage;

