import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import Select from "../../../components/Form/Select";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import BottomWidget from "../../../components/Widgets/BottomWidget";

const BookingFilter = observer(({onSubmit, date_start, date_end, quantity}) => {
    registerLocale('ru', ru)

    const [person, setPerson] = useState(quantity ? quantity: 1);
    const [dateRange, setDateRange] = useState([date_start, date_end]);
    const [startDate, endDate] = dateRange;


    const persons = [];
    for(let i = 1; i<5; i++){
        persons.push(i)
    }
    const setFilter = (startDate, endDate, person) =>{
        onSubmit(startDate, endDate, person);
    }
    return (
        <div>
            <BottomWidget title={'Фильтр'}>
                <DatePicker
                    selected={startDate}
                    placeholderText={'Укажите дату для поиска'}
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd.MM.yyyy"
                    locale="ru"
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    minDate={new Date()}
                    customInput={<input className={'input'}/>}
                    withPortal
                    // selectsDisabledDaysInRange
                    showDisabledMonthNavigation
                />
                <Select
                    label={'Кол-во человек'}
                    name={'quantity'}
                    items={persons}
                    required={true}
                    value={person}
                    onChange={setPerson}
                />
                <button className="button bottom-widget__button" onClick={()=>{setFilter(startDate, endDate, person)}}>Найти</button>
            </BottomWidget>
        </div>
    );
});
export default BookingFilter;