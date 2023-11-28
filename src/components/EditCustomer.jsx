import React, { useState } from 'react';
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-grid.css";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';


export default function EditCustomer(props){

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
    
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    };

    const handleEditCustomer = () => {
        props.updateCustomer(customer);
        handleClose();
    }

    return (
            <div>

                <Button variant="outlined" color="primary" onClick={handleOpen}>
                    Edit 
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-open">
                <DialogTitle id="form-dialog-open">Edit</DialogTitle>
                <DialogContent>

                    <TextField
                     autoFocus 
                     margin="dense" 
                     name="firstname" 
                     value={customer.firstname} 
                     onChange={e => handleInputChange(e)} 
                     label="First Name" 
                     fullWidth />

                    <TextField 
                    autoFocus 
                    margin="dense" 
                    name="lastname" 
                    value={customer.lastname} 
                    onChange={e => handleInputChange(e)} 
                    label="Last Name" 
                    fullWidth />

                    <TextField 
                    autoFocus 
                    margin="dense" 
                    name="streetaddress" 
                    value={customer.streetaddress} 
                    onChange={e => handleInputChange(e)} 
                    label="Street Address" 
                    fullWidth />

                    <TextField 

                    autoFocus 
                    margin="dense" 
                    name="postcode" 
                    value={customer.postcode} 
                    onChange={e => handleInputChange(e)} 
                    label="Post Code" 
                    fullWidth />
                    <TextField 

                    autoFocus 
                    margin="dense" 
                    name="city" value={customer.city} 
                    onChange={e => handleInputChange(e)} 
                    label="City" 
                    fullWidth />
                    <TextField 

                    autoFocus 
                    margin="dense" 
                    name="email" 
                    value={customer.email} 
                    onChange={e => handleInputChange(e)} 
                    label="Email" 
                    fullWidth />
                    <TextField 

                    autoFocus 
                    margin="dense" 
                    name="phone" 
                    value={customer.phone} 
                    onChange={e => handleInputChange(e)} 
                    label="Phone Number" 
                    fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleEditCustomer } color="primary">Save</Button>
                </DialogActions>
                </Dialog>

            </div>


    )



}
