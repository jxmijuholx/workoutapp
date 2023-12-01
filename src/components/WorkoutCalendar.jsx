import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function WorkoutCalendar() {
    const [events, setEvents] = useState([]);
    const url = 'https://traineeapp.azurewebsites.net/api/trainings';

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const formattedEvents = data.content.map((training) => ({
                    title: training.activity,
                    start: new Date(training.date),
                    end: new Date(new Date(training.date).getTime() + training.duration * 60000),
                }));
                setEvents(formattedEvents);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}