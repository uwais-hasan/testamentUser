import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Grid, TextField} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {updateData} from "../../Utils/FetchData";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import AlertNotify from "./AlertNotify";
import {useTranslation} from "next-i18next";
import {showNotify} from "../../Store/Slicess/SliceNotify";

const ModelCheckIsSpecialFriend = ({open, setOpen,data}) => {




    const dispatch=useDispatch()
    const router=useRouter();
    const{Alert}=useSelector(state=>state.sliceNotify)
    const{t:translate}=useTranslation('voting')
    const[checkerDataInsert,setDataInsert]=useState({name:'',email:'',password:''})







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
                router.reload()

            } else {
                setDataInsert({...checkerDataInsert,name: '',email: '',password: ''})

                dispatch(showNotify({showAlert:true,status:'error',title:translate('error_check_data_specialFriend')}))


            }
        } else {
            dispatch(showNotify({showAlert:true,title: translate('error_already_vote'),status:'error'}))
            setDataInsert({...checkerDataInsert,name: '',email: '',password: ''})

        }


    }
    return (
        <div>
            {Alert.showAlert&&<AlertNotify status={Alert.status}  title={Alert.title} showAlert={Alert.showAlert} />}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {translate('voting_special_friends')}
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent='center' gap={1} >
                        <TextField  label={translate("name")}
                                    size="large"
                                    style={{margin:'10px 1px',padding:'10px 0',}}
                                    value={checkerDataInsert.name}
                                    type='text'
                                    placeholder='firstName'
                                    variant="standard"
                                    onChange={(e)=>setDataInsert({...checkerDataInsert,name: e.target.value})}
                        />
                        <TextField  label={translate("email")}
                                    size="large"
                                    style={{margin:'10px 1px',padding:'10px 0'}}
                                    value={checkerDataInsert.email}
                                    type='email'
                                    variant="standard"
                                    onChange={(e)=>setDataInsert({...checkerDataInsert,email: e.target.value})}
                        />

                        <TextField  label={translate("password")}
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
                    <Button onClick={handleSub}>{translate('submit')}</Button>
                    <Button onClick={handleClose} autoFocus>{translate('cancel')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModelCheckIsSpecialFriend;