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
import {useTranslation} from "next-i18next";
import AlertNotify from "./AlertNotify";


const ModelResetPassword = ({openRestPassword,setOpenPassword}) => {
    const {auth}=useSelector(state=>state.sliceAuth)
    const[data,setData]=useState({oldPassword:'',newPassword:''})
    const{t:translate}=useTranslation('index')
    const[isValid,setIsValid]=useState({status:'',title:''})
    const[showAlert,setShowAlert]=useState(false)
    const router=useRouter()



    const handleClose = () => {
        setOpenPassword(false);
    };


    const handleSub=async ()=> {


       const update=await updateData('user/restpassword',data,auth.access_Token);
       if (update.err){
           setShowAlert(true);
            setIsValid({...isValid,title: translate('error_change_password'),status:'error'})
       }else {
           setShowAlert(true);
           setIsValid({...isValid,title: translate('success_change_password'),status:'success'})
           router.reload()
       }



    }


    return (
        <div>
            {showAlert&&<AlertNotify status={isValid.status}  title={isValid.title} showAlert={showAlert} setShowAlert={setShowAlert} />}

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
                                    style={{margin:'10px 1px',padding:'10px 0',}}
                                    value={data.oldPassword}
                                    type='text'
                                    placeholder='old password'
                                    variant="standard"
                                    onChange={(e)=>setData({...data,oldPassword: e.target.value})}
                        />
                        <TextField  label={translate('new password')}
                                    size="large"
                                    style={{margin:'10px 1px',padding:'10px 0'}}
                                    value={data.newPassword}
                                    type='text'
                                    placeholder='new password'
                                    variant="standard"
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