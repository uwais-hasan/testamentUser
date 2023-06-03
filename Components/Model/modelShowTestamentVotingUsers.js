import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import TestamentUser from "../ContentHome/TestamentUser";

const ModelShowTestamentVotingUsers = ({showTestament,setShowTestament,testament}) => {


    const handleClose = () => {
        setShowTestament(false);
    };



    return (
        <div>
            <Dialog
                open={showTestament}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                   testament
                </DialogTitle>
                <DialogContent>
                        <TestamentUser testament={testament}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModelShowTestamentVotingUsers;