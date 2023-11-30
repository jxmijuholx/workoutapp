import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';

export default function AddWorkout({ params, getWorkouts, setMsg }) {
    const url = 'https://traineeapp.azurewebsites.net/api/trainings';
    const customersUrl = 'https://traineeapp.azurewebsites.net/api/customers';

    const [workout, setWorkout] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: params?.customer || ''
    });

    const [customers, setCustomers] = useState([]);
    const [openAddWorkout, setOpenAddWorkout] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        fetch(customersUrl)
            .then((response) => response.json())
            .then((data) => setCustomers(data.content))
            .catch((error) => console.error(error));
    }, []);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setWorkout({ ...workout, [e.target.name]: e.target.value });
    };

    const addWorkout = async () => {
        console.log(workout);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(workout)
            });

            if (response.ok) {
                await getWorkouts();
                setMsg('Workout added');
            } else {
                console.error('Failed to add workout');
            }
        } catch (error) {
            console.error(error);
        }
        handleClose();
    };

    return (
        <div>
            <Button
                style={{ margin: 10 }}
                variant="outlined"
                color="primary"
                onClick={handleOpen}
            >
                Add Workout
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-open">
                <DialogTitle id="form-dialog-open">Add a new workout</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        type="datetime-local"
                        value={workout.date}
                        onChange={(e) => handleInputChange(e)}
                        label="Date and Time"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={workout.duration}
                        onChange={(e) => handleInputChange(e)}
                        label="Duration"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={workout.activity}
                        onChange={(e) => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="customer"
                        select
                        value={workout.customer}
                        onChange={(e) => handleInputChange(e)}
                        label="Customer"
                        fullWidth
                    >
                        {customers.map((customer) => (
                            <MenuItem key={customer.links[0].href} value={customer.links[0].href}>
                                {`${customer.firstname || 'Unknown'} ${customer.lastname || 'Unknown'}`}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => addWorkout()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
