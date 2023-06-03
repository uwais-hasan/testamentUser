import React from 'react';
import {Alert, Snackbar} from "@mui/material";

const AlertNotify = ({title,status,showAlert,setShowAlert}) => {


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
    };

    return (

        <Snackbar open={showAlert} autoHideDuration={4000} onClose={handleClose}  anchorOrigin={{vertical: 'top', horizontal: 'right', }}>
            <Alert onClose={handleClose} severity={status||''} sx={{ width: '100%' }} >
                {title}
            </Alert>
        </Snackbar>
    );
};

export default AlertNotify;