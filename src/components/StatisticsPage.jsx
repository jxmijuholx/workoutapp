import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import _ from 'lodash';

export default function StatisticsPage() {
    const [data, setData] = useState([]);
    const url = 'https://traineeapp.azurewebsites.net/api/trainings';

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const grouped = _.groupBy(data.content, 'activity');
                const chartData = _.map(grouped, (group, activity) => ({
                    activity,
                    duration: _.sumBy(group, 'duration'),
                }));
                setData(chartData);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="activity" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
    );
}