import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';  // Import Alert from Material-UI

export default function DeleteCustomer({ params, getCustomers }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const deleteCustomer = () => {
        if (window.confirm('Are you sure?')) {
            const customerLink =
                params.data &&
                params.data.links &&
                params.data.links.find(link => link.rel === 'self') &&
                params.data.links.find(link => link.rel === 'self').href;

            if (customerLink) {
                fetch(customerLink, { method: 'DELETE' })
                    .then((response) => {
                        if (response.ok) {
                            setSnackbarSeverity('success');
                            setSnackbarMessage('Customer deleted successfully');
                            setSnackbarOpen(true);
                            getCustomers();
                        } else {
                            setSnackbarSeverity('error');
                            setSnackbarMessage(`Error deleting customer: ${response.status} ${response.statusText}`);
                            setSnackbarOpen(true);
                        }
                    })
                    .catch((err) => {
                        setSnackbarSeverity('error');
                        setSnackbarMessage(`Error deleting customer: ${err.message}`);
                        setSnackbarOpen(true);
                    });
            } else {
                setSnackbarSeverity('error');
                setSnackbarMessage('Invalid customer link');
                setSnackbarOpen(true);
            }
        }
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={deleteCustomer}>
                Delete
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert severity={snackbarSeverity} onClose={handleCloseSnackbar}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
