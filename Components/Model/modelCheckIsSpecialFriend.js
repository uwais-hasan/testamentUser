import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Grid, TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {updateData} from "../../Utils/FetchData";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import AlertNotify from "./AlertNotify";

const ModelCheckIsSpecialFriend = ({open, setOpen,data}) => {

    const[checkerDataInsert,setDataInsert]=useState({name:'',email:'',password:''})
    const[showAlert,setShowAlert]=useState(false)
    const[isValid,setIsValid]=useState({status:'',title:''})

    const router=useRouter();



    const handleClose = () => {
        setOpen(false);
    };


    const handleSub=async ()=>{
        const type=data.typeTestament;


        const isDouble = data.voteSpecialFriends.filter(item => item.name === checkerDataInsert.name &&
            item.email === checkerDataInsert.email);

        const isValid= data.selectSpecialFriend.some(item => Object.entries(checkerDataInsert).every(([key, value]) => item[key] === value));
        const dataUser = data.selectSpecialFriend.find(item => item.name === checkerDataInsert.name &&
            item.email === checkerDataInsert.email);


        if (isDouble.length <1) {
            if (isValid) {
                 await updateData('user/vote', {id: data._id, type, voteSpecialFriends: {name: checkerDataInsert.name, email: checkerDataInsert.email,picture:dataUser.picture}})
                setDataInsert({...checkerDataInsert,name: '',email: '',password: ''})
                router.reload()

            } else {
                setShowAlert(true);
                setIsValid({...isValid,title: 'some thing error',status:'error'})

            }
        } else {
            setShowAlert(true);
            setIsValid({...isValid,title: 'you already vote',status:'error'})

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
                 voting special friend
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent='center' gap={1} >
                        <TextField  label='name'
                                    size="large"
                                    style={{margin:'10px 1px',padding:'10px 0',}}
                                    value={checkerDataInsert.name}
                                    type='text'
                                    placeholder='firstName'
                                    variant="standard"
                                    onChange={(e)=>setDataInsert({...checkerDataInsert,name: e.target.value})}
                        />
                        <TextField  label='email'
                                    size="large"
                                    style={{margin:'10px 1px',padding:'10px 0'}}
                                    value={checkerDataInsert.email}
                                    type='email'
                                    variant="standard"
                                    onChange={(e)=>setDataInsert({...checkerDataInsert,email: e.target.value})}
                        />

                        <TextField  label='password'
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
                    <Button onClick={handleSub}>submit</Button>
                    <Button onClick={handleClose} autoFocus>cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModelCheckIsSpecialFriend;