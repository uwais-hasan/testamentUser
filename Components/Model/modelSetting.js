import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'
import {Grid, TextField} from "@mui/material";
import {updateData} from "../../Utils/FetchData";
import {useSelector} from "react-redux";
import {useTranslation} from "next-i18next";

import {useRouter} from "next/router";
import AlertNotify from "./AlertNotify";
const ModelSetting = ({open, setOpen}) => {
    const {auth}=useSelector(state=>state.sliceAuth)
    const{firstName, lastName, age, country, city, phone,}=auth.user
    const[data,setData]=useState({firstName:firstName||'',lastName:lastName||'',age:age||'',country:country||'',city:city||'',phone:phone||''})
    const[showAlert,setShowAlert]=useState(false)
    const[isValid,setIsValid]=useState({status:'',title:''})
    const{t:translate}=useTranslation('index')
    const router = useRouter()
    const handleClose = () => {
        setOpen(false);
    };
    const handleSub=async ()=>{

        handleClose()

        const name=data.firstName +' '+data.lastName
     const update=await updateData('user/update', {...data,name},auth.access_Token)
        if (update.err){
            setShowAlert(true);
            setIsValid({...isValid,title:translate('error_server'),status:'error'})
        }else {
            router.reload()
        }

    }


    return (
        <div>
            {showAlert&&<AlertNotify status={isValid.status}  title={isValid.title} showAlert={showAlert} setShowAlert={setShowAlert} />}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                  <h2 >{translate('update_your_information')}</h2>
                </DialogTitle>
                <DialogContent>
                 <Grid container justifyContent='center' gap={1} >


                     <TextField  label={translate('firstName')}
                                 size="large"
                                 id="filled-textarea"
                                 variant="filled"
                                 value={data.firstName}
                                 type='text'
                                 placeholder='firstName'
                                 onChange={(e)=>setData({...data,firstName: e.target.value})}
                     />
                     <TextField  label={translate('lastName')}
                                 size="large"

                                 value={data.lastName}
                                 type='text'
                                 id="filled-textarea"
                                 variant="filled"
                                 onChange={(e)=>setData({...data,lastName: e.target.value})}
                     />

                     <TextField  label={translate('city')}
                                 size="large"

                                 value={data.city}
                                 type='text'
                                 id="filled-textarea"
                                 variant="filled"
                                 onChange={(e)=>setData({...data,city: e.target.value})}
                     />
                     <TextField  label={translate('country')}
                                 size="large"

                                 value={data.country}
                                 type='text'
                                 id="filled-textarea"
                                 variant="filled"
                                 onChange={(e)=>setData({...data,country: e.target.value})}
                     />
                     <TextField  label={translate('phone')}
                                 size="large"

                                 value={data.phone}
                                 type='text'
                                 id="filled-textarea"
                                 variant="filled"
                                 onChange={(e)=>setData({...data,phone: e.target.value})}
                     />
                     <TextField  label={translate('age')}
                                 size="large"
                                
                                 value={data.age}
                                 type='text'
                                 id="filled-textarea"
                                 variant="filled"
                                 onChange={(e)=>setData({...data,age: e.target.value})}
                     />

                 </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSub}>{translate('update')}</Button>
                    <Button onClick={handleClose} autoFocus>
                        {translate('cancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModelSetting;