import React, { useEffect, useContext } from 'react';
import './NavGraphic.scss';
import { WorkPlanContext } from '../../templates/GraphicPage/GraphicPage';

const NavGraphic = ({ className, setDateEnd, dateEnd, dateStart, setDateStart }) => {
    const { dragable, submitWorkPlan, setDragable } = useContext(WorkPlanContext);

    useEffect(() => {
        handleChangeDate(new Date());
    }, [])
    const additionDays = (date, days) => {
        const dateObject = new Date(date);
        const newDate = new Date(dateObject.setTime(dateObject.getTime() + (days * 24 * 60 * 60 * 1000)));
        const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
        const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        return `${year}-${month}-${day}`
    }
    const subtractionDays = (date, days, sign = 'addition') => {
        const dateObject = new Date(date);
        const newDate = new Date(dateObject.setTime(dateObject.getTime() - (days * 24 * 60 * 60 * 1000)));
        const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
        const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        return `${year}-${month}-${day}`;
    }

    const handleChangeDate = (date) => {
        const day = date.getDay();
        if (day === 0) {
            setDateStart(subtractionDays(date, 6));
            const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            const year = date.getFullYear();
            setDateEnd(`${year}-${month}-${day}`);
            return;
        }
        if (day === 1) {
            const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            const year = date.getFullYear();
            setDateStart(`${year}-${month}-${day}`);
            setDateEnd(additionDays(date, 6));
            return;
        }
        setDateStart(subtractionDays(date, day - 1));
        setDateEnd(additionDays(date, 7 - day))

    }

    const handleNextWeek = () => {
        const days = 7;
        setDateStart(additionDays(dateStart, days));
        setDateEnd(additionDays(dateEnd, days));
    }
    const handlePreviousWeek = () => {
        const days = 7;
        setDateStart(subtractionDays(dateStart, days));
        setDateEnd(subtractionDays(dateEnd, days));
    }

    return (
        <nav className={`${className} graphicNav`}>

            <div className='calendar'>
                <div className='calendar__startDate'>
                    <div className='dateShow'>
                        <span>{dateStart}</span>
                    </div>
                    <input type="date" onChange={(e) => handleChangeDate(new Date(e.target.value))} value={dateStart} />
                </div>
                <div className='calendar__endDate'>
                    <input type="date" onChange={(e) => handleChangeDate(new Date(e.target.value))} value={dateEnd} />
                    <div className='dateShow'>
                        <span>{dateEnd}</span>
                    </div>

                </div>
                <button className='GraphicNav__navigation GraphicNav__navigation--next' onClick={handleNextWeek}>

                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 330 330" space="preserve">
                        <path className='arrowIcon' id="XMLID_224_" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	                                                l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	                                                C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/>
                    </svg>

                </button>
                <button className='GraphicNav__navigation GraphicNav__navigation--back' onClick={handlePreviousWeek}>

                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 330 330" space="preserve">
                        <path className='arrowIcon' id="XMLID_224_" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	                                                l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	                                                C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/>
                    </svg>

                </button>
            </div>
            <button onClick={dragable ? submitWorkPlan : () => setDragable(true)} className='graphicNav__btn'>{dragable ? 'Zapisz' : 'Odblokuj'}</button>
        </nav >
    )
}
export default NavGraphic;