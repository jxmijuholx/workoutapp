import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

export default function WorkoutAnalytics() {
    const [workouts, setWorkouts] = useState([]);
    const url = 'https://traineeapp.azurewebsites.net/api/trainings';

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => setWorkouts(data.content))
            .catch((error) => console.error(error));
    }, []);

    const totalWorkouts = workouts.length;

    const totalDuration = workouts.reduce((total, workout) => total + workout.duration, 0);

    const mostCommonActivity = workouts.reduce((acc, workout) => {
        acc[workout.activity] = (acc[workout.activity] || 0) + 1;
        return acc;
    }, {});

    const mostCommonActivityName = Object.keys(mostCommonActivity).reduce((a, b) => mostCommonActivity[a] > mostCommonActivity[b] ? a : b, '');

    const customerActivity = workouts.reduce((acc, workout) => {
        acc[workout.customer] = (acc[workout.customer] || 0) + 1;
        return acc;
    }, {});

    const mostActiveCustomer = Object.keys(customerActivity).reduce((a, b) => customerActivity[a] > customerActivity[b] ? a : b, '');

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Total workouts</th>
                    <th>Total duration of workouts</th>
                    <th>Most common activity</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{totalWorkouts}</td>
                    <td>{totalDuration} minutes</td>
                    <td>{mostCommonActivityName}</td>
                </tr>
            </tbody>

        </Table>
    );
}
