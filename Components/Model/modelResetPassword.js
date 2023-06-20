import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateData} from "../../Utils/FetchData";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Grid, TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import {useTranslation} from "next-i18next";
import AlertNotify from "./AlertNotify";
import {showNotify} from "../../Store/Slicess/SliceNotify";


const ModelResetPassword = ({openRestPassword,setOpenPassword}) => {


    const dispatch=useDispatch()
    const{Alert}=useSelector(state=>state.sliceNotify)
    const {auth}=useSelector(state=>state.sliceAuth)

    const{t:translate}=useTranslation('index')
    const[data,setData]=useState({oldPassword:'',newPassword:''})





    const handleClose = () => {
        setOpenPassword(false);
    };


    const handleSub=async ()=> {


       const update=await updateData('user/restpassword',data,auth.access_Token);
       if (update.err){
           setData({oldPassword:'',newPassword:''})
           dispatch(showNotify({showAlert:true,title: translate('error_change_password'),status:'error'}))

       }else {

           dispatch(showNotify({showAlert:true,title: translate('success_change_password'),status:'success'}))
           setOpenPassword(false);
       }



    }


    return (
        <div>
            {Alert.showAlert&&<AlertNotify status={Alert.status}  title={Alert.title} showAlert={Alert.showAlert} />}

            <Dialog
                open={openRestPassword}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {translate('change_Password')}
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent='center' gap={1} >
                        <TextField  label={translate('old password')}
                                    size="large"

                                    value={data.oldPassword}
                                    type='text'
                                    placeholder='old password'
                                    id="filled-textarea"
                                    variant="filled"
                                    onChange={(e)=>setData({...data,oldPassword: e.target.value})}
                        />
                        <TextField  label={translate('new password')}
                                    size="large"

                                    value={data.newPassword}
                                    type='text'
                                    placeholder='new password'
                                    id="filled-textarea"
                                    variant="filled"
                                    onChange={(e)=>setData({...data,newPassword: e.target.value})}
                        />



                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSub}>{translate('change')}</Button>
                    <Button onClick={handleClose} autoFocus>{translate('cancel')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModelResetPassword;