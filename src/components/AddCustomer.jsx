import React, { useState } from 'react';
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-grid.css";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function AddCustomer(props) {
    const url = 'https://traineeapp.azurewebsites.net/api/customers'

    const [open, setOpen] = useState(false);

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const addCustomer = async () => {
        console.log(customer);
        const addCustomer = (customer, link) => {
            fetch(link, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(customer)
            })
                .then((response) => {
                    if (response.ok) {
                        props.setMsg('Customer added');
                        props.getCustomers();
                    }
                })
                .catch((err) => console.error(err));
        }
        await addCustomer(customer, url);
        handleClose();
    }



    return (
        <div>
            <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={handleOpen}>
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-open">
                <DialogTitle id="form-dialog-open">Add a new customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={e => handleInputChange(e)}
                        label="First Name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={e => handleInputChange(e)}
                        label="Last Name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={e => handleInputChange(e)}
                        label="Street Address"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={e => handleInputChange(e)}
                        label="Post Code"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={e => handleInputChange(e)}
                        label="City"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={e => handleInputChange(e)}
                        label="Email"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={e => handleInputChange(e)}
                        label="Phone Number"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addCustomer} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}