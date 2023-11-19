import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';


export default function WorkoutsList() {

    const [workouts, setWorkouts] = useState([]);
    const url = 'https://traineeapp.azurewebsites.net/api/trainings'
    const columns = [
        { headerName: "Activity", field: "activity", sortable: true, filter: true },
        { headerName: "Duration", field: "duration", sortable: true, filter: true },
        {
            headerName: "Date",
            field: "date",
            sortable: true,
            filter: true,
            valueGetter: (params) => format(new Date(params.data.date), 'dd/MM/yyyy')
        },
        { headerName: "Customer", field: "customer", sortable: true, filter: true },
    ];

    useEffect(() => {
        getWorkouts();
    }, [])

    const getWorkouts = () => {
        fetch(url)
            .then(response => response.json())
            .then((responseData) => {
                const promises = responseData.content.map(workout => {
                    // Find the customer link
                    const customerLink = workout.links.find(link => link.rel === 'customer');

                    if (customerLink) {
                        return fetch(customerLink.href)
                            .then(response => response.json())
                            .then(customerData => {
                                workout.customer = customerData.lastname;
                                return workout;
                            });
                    }
                });

                Promise.all(promises)
                    .then(updatedWorkouts => setWorkouts(updatedWorkouts));
            });
    }


    return (
        <div className="ag-theme-material" style={{ height: 700, width: '100%', margin: 'auto' }}>
            <AgGridReact
                rowData={workouts}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={20}
                suppressCellSelection={true}
                rowHeight={30}
            />

        </div>
    );
}