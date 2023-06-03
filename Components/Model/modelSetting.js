import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'
import {Grid, TextField} from "@mui/material";
import {updateData} from "../../Utils/FetchData";
import {useSelector} from "react-redux";
const ModelSetting = ({open, setOpen}) => {
    const {auth}=useSelector(state=>state.sliceAuth)

    const{firstName, lastName, age, country, city, phone,}=auth.user
    const[data,setData]=useState({firstName:firstName||'',lastName:lastName||'',age:age||'',country:country||'',city:city||'',phone:phone||''})


    const handleClose = () => {
        setOpen(false);
    };
    const handleSub=async ()=>{

        handleClose()

        const updateDataUser=await updateData('user/update',data,auth.access_Token)

    }


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                  <h1 >update your information</h1>
                </DialogTitle>
                <DialogContent>
                 <Grid container justifyContent='center' gap={1} >
                     <TextField  label='firstName'
                                 size="large"
                                 style={{margin:'10px 1px',padding:'10px 0',}}
                                 value={data.firstName}
                                 type='text'
                                 placeholder='firstName'
                                 variant="standard"
                                 onChange={(e)=>setData({...data,firstName: e.target.value})}
                     />
                     <TextField  label='lastName'
                                 size="large"
                                 style={{margin:'10px 1px',padding:'10px 0'}}
                                 value={data.lastName}
                                 type='text'
                                 variant="standard"
                                 onChange={(e)=>setData({...data,lastName: e.target.value})}
                     />

                     <TextField  label='city'
                                 size="large"
                                 style={{margin:'10px 1px',padding:'10px 0'}}
                                 value={data.city}
                                 type='text'
                                 variant="standard"
                                 onChange={(e)=>setData({...data,city: e.target.value})}
                     />
                     <TextField  label='country'
                                 size="large"
                                 style={{margin:'10px 1px',padding:'10px 0'}}
                                 value={data.country}
                                 type='text'
                                 variant="standard"
                                 onChange={(e)=>setData({...data,country: e.target.value})}
                     />
                     <TextField  label='phone'
                                 size="large"
                                 style={{margin:'10px 1px',padding:'10px 0'}}
                                 value={data.phone}
                                 type='text'
                                 variant="standard"
                                 onChange={(e)=>setData({...data,phone: e.target.value})}
                     />
                     <TextField  label='age'
                                 size="large"
                                 style={{margin:'10px 1px',padding:'10px 0'}}
                                 value={data.age}
                                 type='text'
                                 variant="standard"
                                 onChange={(e)=>setData({...data,age: e.target.value})}
                     />
                     {/*<TextField  label='password'*/}
                     {/*            size="large"*/}
                     {/*            style={{margin:'10px 1px',padding:'10px 0'}}*/}
                     {/*            value={data.password}*/}
                     {/*            type='password'*/}

                     {/*            variant="standard"*/}
                     {/*            onChange={(e)=>setData({...data,password: e.target.value})}*/}
                     {/*/>*/}
                     {/*<TextField  label='re_password'*/}
                     {/*            size="large"*/}
                     {/*            style={{margin:'10px 1px',padding:'10px 0'}}*/}
                     {/*            value={data.re_password}*/}
                     {/*            type='password'*/}
                     {/*            variant="standard"*/}
                     {/*            onChange={(e)=>setData({...data,re_password: e.target.value})}*/}
                     {/*/>*/}
                 </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSub}>update</Button>
                    <Button onClick={handleClose} autoFocus>
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModelSetting;