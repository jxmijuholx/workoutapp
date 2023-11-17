import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';

export default function CustomerList() {
    
    const url = 'https://traineeapp.azurewebsites.net/api/customers'
    const [customers, setCustomers] = useState([]);

    const columns = [
        { headerName: "First Name", field: "firstname", sortable: true, filter: true },
        { headerName: "Last Name", field: "lastname", sortable: true, filter: true },
        { headerName: "Street Address", field: "streetaddress", sortable: true, filter: true },
        { headerName: "Post Code", field: "postcode", sortable: true, filter: true },
        { headerName: "City", field: "city", sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "Phone Number", field: "phone", sortable: true, filter: true },
        
    ];

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch(url)
        .then(response => response.json())
        .then((responseData) => {
            console.log(responseData.content)
            setCustomers(responseData.content)
        });
    }

    return (
        <div className="ag-theme-material" style={{ height: 700, width: '100%', margin: 'auto' }}>
        <AgGridReact
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={20}
            suppressCellSelection={true}
            rowHeight={30}
        />

    </div>
    );
}