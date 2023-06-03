import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {updateData} from "../../Utils/FetchData";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Grid, TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";


const ModelResetPassword = ({openRestPassword,setOpenPassword}) => {
    const {auth}=useSelector(state=>state.sliceAuth)
    const[data,setData]=useState({oldPassword:'',newPassword:''})

    const router=useRouter()




    const handleClose = () => {
        setOpenPassword(false);
    };


    const handleSub=async ()=> {


        const update=await updateData('user/restpassword',data,auth.access_Token);


    }


    return (
        <div>
            <Dialog
                open={openRestPassword}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                   update Password
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent='center' gap={1} >
                        <TextField  label='old password'
                                    size="large"
                                    style={{margin:'10px 1px',padding:'10px 0',}}
                                    value={data.oldPassword}
                                    type='text'
                                    placeholder='firstName'
                                    variant="standard"
                                    onChange={(e)=>setData({...data,oldPassword: e.target.value})}
                        />
                        <TextField  label='new Password'
                                    size="large"
                                    style={{margin:'10px 1px',padding:'10px 0'}}
                                    value={data.newPassword}
                                    type='text'
                                    variant="standard"
                                    onChange={(e)=>setData({...data,newPassword: e.target.value})}
                        />



                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSub}>submit</Button>
                    <Button onClick={handleClose} autoFocus>cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModelResetPassword;