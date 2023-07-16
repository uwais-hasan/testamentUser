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
import {useDispatch, useSelector} from "react-redux";
import {showNotify} from "../../Store/Slicess/SliceNotify";
import {arabic, english} from "../tran/trans";
import {useRouter} from "next/router";

const ModelReceiveSpecialFriends = ({openReceive, setOpenReceive,data,setShowTestament,showTestament}) => {

    const router=useRouter();
    const dispatch=useDispatch()
    const{Alert}=useSelector(state=>state.sliceNotify)

    const[checkerDataInsert,setDataInsert]=useState({name:'',email:'',password:''})

    const translate=router.locale==='en'?english:arabic;


    const handleSub=async ()=>{


        const isValid= data.selectReceiveFriend.some(item => Object.entries(checkerDataInsert).every(([key, value]) => item[key] === value));
            if (isValid) {
                setShowTestament(true)
                setOpenReceive(false)
                setDataInsert({...checkerDataInsert,name: '',email: '',password: ''})

            } else {
                dispatch(showNotify({showAlert:true,title: translate.error_check_data_receiveFriend,status:'error'}))

            }
        }
    const handleClose = () => {
        setOpenReceive(false);
    };


    return (
        <div>
            {Alert.showAlert&&<AlertNotify status={Alert.status}  title={Alert.title} showAlert={Alert.showAlert} />}

            {showTestament&& <ModelShowTestamentVotingUsers testament={data.testament} showTestament={showTestament} setShowTestament={setShowTestament}/>}
            <Dialog
                open={openReceive}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {translate.receive_special_friend}
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent='center' gap={1} >
                        <TextField  label={translate.name}
                                    size="large"

                                    value={checkerDataInsert.name}
                                    type='text'
                                    placeholder='firstName'
                                    id="filled-textarea"
                                    variant="filled"
                                    onChange={(e)=>setDataInsert({...checkerDataInsert,name: e.target.value})}
                        />
                        <TextField  label={translate.email}
                                    size="large"
                                   
                                    value={checkerDataInsert.email}
                                    type='email'
                                    id="filled-textarea"
                                    variant="filled"
                                    onChange={(e)=>setDataInsert({...checkerDataInsert,email: e.target.value})}
                        />

                        <TextField  label={translate.password}
                                    size="large"

                                    value={checkerDataInsert.password}
                                    type='password'
                                    id="filled-textarea"
                                    variant="filled"
                                    onChange={(e)=>setDataInsert({...checkerDataInsert,password: e.target.value})}
                        />

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSub}>{translate.Receive}</Button>
                    <Button onClick={handleClose} autoFocus>{translate.cancel}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModelReceiveSpecialFriends;