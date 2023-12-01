import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';
import AddCustomer from './AddCustomer';
import DeleteCustomer from './DeleteCustomer';
import EditCustomer from './EditCustomer';
import AddWorkoutCustomer from './AddWorkoutCustomer';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { Button } from '@mui/material';



export default function CustomerList() {

    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    const url = 'https://traineeapp.azurewebsites.net/api/customers'
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers();
    }, [])

    const columns = [
        { headerName: "First Name", field: "firstname", sortable: true, filter: true },
        { headerName: "Last Name", field: "lastname", sortable: true, filter: true },
        { headerName: "Street Address", field: "streetaddress", sortable: true, filter: true },
        { headerName: "Post Code", field: "postcode", sortable: true, filter: true },
        { headerName: "City", field: "city", sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "Phone Number", field: "phone", sortable: true, filter: true },
        {
            headerName: 'Delete',
            field: 'links.self.href',
            width: 100,
            cellRenderer: (params) => (
                <DeleteCustomer
                    params={params}
                    getCustomers={getCustomers} />
            ),
        },
        {
            headerName: 'Edit',
            field: 'links',
            width: 100,
            cellRenderer: (params) => (
                <EditCustomer
                    customer={params.data}
                    updateCustomer={(customer) => updateCustomer(customer, params.data.links[0].href)}
                />
            ),
        },
        {
            headerName: 'Add workout',
            field: 'links',
            width: 100,
            cellRenderer: (params) => (
                <AddWorkoutCustomer
                    params={params} // Make sure to pass the correct prop name
                    saveCustomer={(customer) => saveCustomer(customer)}
                />
            ),
        },
    ];

    const exportToCSV = () => {
        const customersToExport = customers.map(({ firstname, lastname, streetaddress, postcode, city, email, phone }) => ({
            firstname,
            lastname,
            streetaddress,
            postcode,
            city,
            email,
            phone
        }));

        const csv = Papa.unparse(customersToExport);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'customers.csv');
    };


    const getCustomers = () => {
        fetch(url)
            .then(response => response.json())
            .then((responseData) => {
                console.log(responseData.content)
                setCustomers(responseData.content)
            });
    }

    const updateCustomer = (customer, url) => {
        if (!url) {
            console.error('Link is undefined or null.');
            return;
        }

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then((response) => {
                if (response.ok) {
                    setMsg('Customer updated');
                    setOpen(true);
                    getCustomers();
                }
            })
            .catch((err) => console.error(err));
    };

    const saveCustomer = (newCustomer) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
            .then((response) => {
                if (response.ok) {
                    setMsg('Customer added');
                    setOpen(true);
                    getCustomers();
                }
            })
            .catch((err) => console.error(err));
    };


    return (
        <div className="ag-theme-material" style={{ height: 700, width: '100%', margin: 'auto' }}>
            <Button variant="contained" color="primary" onClick={exportToCSV}>
                Export to CSV
            </Button>
            <AddCustomer setMsg={setMsg} getCustomers={getCustomers} />
            <AgGridReact
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={30}
                suppressCellSelection={true}
                rowHeight={30}
            />

        </div>
    );
}