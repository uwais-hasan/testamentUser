import React, {useState} from 'react';


import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Grid, TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ModelShowTestamentVotingUsers from "./modelShowTestamentVotingUsers";
import AlertNotify from "./AlertNotify";
import {useTranslation} from "next-i18next";

const ModelReceiveSpecialFriends = ({openReceive, setOpenReceive,data,setShowTestament,showTestament}) => {

    const[checkerDataInsert,setDataInsert]=useState({name:'',email:'',password:''})
    const[showAlert,setShowAlert]=useState(false)
    const[isValid,setIsValid]=useState({status:'',title:''})

    const{t:translate}=useTranslation('voting')
    const handleSub=async ()=>{


        const isValid= data.selectReceiveFriend.some(item => Object.entries(checkerDataInsert).every(([key, value]) => item[key] === value));
            if (isValid) {
                setShowTestament(true)
                setDataInsert({...checkerDataInsert,name: '',email: '',password: ''})

            } else {
                setShowAlert(true);
                setIsValid({...isValid,title: translate('error_check_data_specialFriend'),status:'error'})

            }
        }

    if (showTestament){
        return <ModelShowTestamentVotingUsers testament={data.testament} showTestament={showTestament} setShowTestament={setShowTestament}/>
    }



    const handleClose = () => {
        setOpenReceive(false);
    };



    return (
        <div>
            {showAlert&&<AlertNotify status={isValid.status}  title={isValid.title} showAlert={showAlert} setShowAlert={setShowAlert} />}

            <Dialog
                open={openReceive}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {translate('receive special friend')}
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent='center' gap={1} >
                        <TextField  label={translate('name')}
                                    size="large"
                                    style={{margin:'10px 1px',padding:'10px 0',}}
                                    value={checkerDataInsert.name}
                                    type='text'
                                    placeholder='firstName'
                                    variant="standard"
                                    onChange={(e)=>setDataInsert({...checkerDataInsert,name: e.target.value})}
                        />
                        <TextField  label={translate('email')}
                                    size="large"
                                    style={{margin:'10px 1px',padding:'10px 0'}}
                                    value={checkerDataInsert.email}
                                    type='email'
                                    variant="standard"
                                    onChange={(e)=>setDataInsert({...checkerDataInsert,email: e.target.value})}
                        />

                        <TextField  label={translate('password')}
                                    size="large"
                                    style={{margin:'10px 1px',padding:'10px 0'}}
                                    value={checkerDataInsert.password}
                                    type='password'
                                    variant="standard"
                                    onChange={(e)=>setDataInsert({...checkerDataInsert,password: e.target.value})}
                        />

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSub}>{translate('Receive')}</Button>
                    <Button onClick={handleClose} autoFocus>{translate('cancel')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModelReceiveSpecialFriends;