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
            .then((responseData) => {
                const promises = responseData.content.map((workout) => {
                    const customerLink = workout.links.find((link) => link.rel === 'customer');

                    if (customerLink) {
                        return fetch(customerLink.href)
                            .then((response) => response.json())
                            .then((customerData) => {
                                workout.customer = `${customerData.firstname} ${customerData.lastname}`;
                                return workout;
                            })
                            .catch((error) => {
                                console.error(`Error fetching customer data: ${error.message}`);
                                return workout;
                            });
                    } else {
                        return Promise.resolve(workout);
                    }
                });

                Promise.all(promises).then((updatedWorkouts) => {
                    const events = updatedWorkouts.map((workout) => ({
                        title: `${workout.activity} - ${workout.customer}`,
                        start: new Date(workout.date),
                        end: new Date(new Date(workout.date).getTime() + workout.duration * 60000),
                    }));
                    setEvents(events);
                });
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