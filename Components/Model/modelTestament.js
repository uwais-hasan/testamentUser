

import React, {Fragment, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ResTestamentData,ResTestamentWithoutData} from "../../data";
import {Box, TextField} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from '../../styles/model_testament.module.scss'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {Grid} from "@mui/material";

const ModelTestament = ({open,setOpen,setIsTestament}) => {

    const widthData = ResTestamentData;
    const withoutData = ResTestamentWithoutData;

    const kindOfTestament=['public','votes users','special Friends']
    const[selectTypeTestament,setSelectTypeTestament]=useState('');
    const[selectSpecialFriend,setSelectSpecialFriend]=useState({email:'',name:''})

    const[selectReceiveFriend,setSelectReceiveFriend]=useState('')
    const[selectCountLikeFriend,setSelectCountLikeFriend]=useState(null)

    const[collectionSelectSpecialFriend,setCollectionSelectSpecialFriend]=useState(withoutData.selectSpecialFriend)
    const[collectionReceiveSpecialFriend,setCollectionReceiveSpecialFriend]=useState(withoutData.selectReceiveFriend)




    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        setOpen(false);
        setIsTestament(true)
    }

    const addSpecialFriends = () => {

        if (!selectSpecialFriend.email||!selectSpecialFriend.name){
            console.log('error')
        }else {
            setCollectionSelectSpecialFriend([...collectionSelectSpecialFriend,selectSpecialFriend])

        }


    }
    // const addReceiveSpecialFriends=(name)=>{
    //     const existName=collectionSelectSpecialFriend.some(item=>item.name===selectReceiveFriend)
    //     const checkDoubleName=collectionReceiveSpecialFriend.some(item=>item===name)
    //
    //
    //     if (!selectReceiveFriend){
    //         console.log('please add a name')
    //     } else if (!existName){
    //         console.log('this name is not exist')
    //     }else if (existName) {
    //         if (checkDoubleName){
    //             console.log('this email already exist')
    //         }else{
    //             setCollectionReceiveSpecialFriend([...collectionReceiveSpecialFriend,selectReceiveFriend])
    //
    //         }
    //
    //     }
    //
    // }

    const addReceiveSpecialFriends=(name)=>{
        const existName=collectionSelectSpecialFriend.find(item=>item.name===selectReceiveFriend)
        const checkDoubleName=collectionReceiveSpecialFriend.some(item=>item.name===name)


        if (!selectReceiveFriend){
            console.log('please add a name')
        } else if (!existName){
            console.log('this name is not exist')
        }else if (existName !== undefined) {
            if (checkDoubleName){
                console.log('this email already exist')
            }else{
                setCollectionReceiveSpecialFriend([...collectionReceiveSpecialFriend,existName])

            }

        }

    }

    const handleDeleteSelectSpecialFriend=(email)=>{
        const filtered= collectionSelectSpecialFriend.filter(item=>item.email!==email)
        setCollectionSelectSpecialFriend(filtered)
    }
    const handleDeleteReceiveFriends=(name)=>{
        const filtered= collectionReceiveSpecialFriend.filter(item=>item.name!==name)
        setCollectionReceiveSpecialFriend(filtered)
    }



    console.log(collectionReceiveSpecialFriend)
    // if (selectTypeTestament){
    //
    //     if (selectTypeTestament==='public'){
    //
    //     }else if (selectTypeTestament==='public'){
    //
    //     }else if(selectTypeTestament==='special Friends'){
    //
    //     }
    // }else {
    //     return null
    // }




    return (
        <div  className={styles.content_model_testament}>

            <Dialog fullWidth
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {withoutData.testament?<p>updateTestament</p>:<p>create testament </p>}

                </DialogTitle>

                <DialogContent>
                    {withoutData.typeTestament?<p>change mode</p>:<div>add mode</div>}

                    { /*select mode*/}
                    <div className={styles.selectModeTestament}>
                        <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                            <InputLabel id="demo-simple-select-standard-label">select Type of Testament</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={selectTypeTestament}
                                onChange={(e)=>setSelectTypeTestament(e.target.value)}
                                label="select Type of Testament"
                            >
                                {kindOfTestament.map(item=>{
                                    return(

                                        <MenuItem key={item} value={item}>{item}</MenuItem>

                                    )
                                })}

                            </Select>
                        </FormControl>
                    </div>
                    { /*select mode*/}

                    { /*option mode*/}
                    <Box className={styles.optionModeTestament}>
                        {!selectTypeTestament&&''}
                        {selectTypeTestament==='public'&& <div className='info_defult'>
                            <p>be care if you pick up this mode, anyone can see your testament without any permission</p>
                            <span>but remember no one can vote and any one can see your testament  </span>
                        </div>}

                        { /*votes users*/}
                        {selectTypeTestament==='votes users'&& <Box className={styles.option_votes_users}>
                            <div className='info_likes_friend'>
                                <p>please write here number of like friends as you want </p>
                                <span>but remember this count if completely all your friend will see your testament</span>
                            </div>
                            <span>pick up number likes of friends</span>
                            <TextField
                                type='number'
                                label='pick up number likes of friends'
                                value={selectCountLikeFriend}
                                onChange={(e)=>setSelectCountLikeFriend(e.target.value)}
                                placeholder='example 100'
                            />

                            <p>you pick up : <span> {selectCountLikeFriend} {selectCountLikeFriend&&' friends'}</span></p>
                        </Box>}
                        { /*votes users*/}




                        { /*special Friends*/}
                        {selectTypeTestament === 'special Friends' &&
                        <Box className={styles.option_special_friends}>special Friends
                            <div className='info_special_Friends'>
                                <p>please write here email and firstName of like your friends as you want </p>
                                <span>but remember all your firend that you are selected just him can be vote </span>
                            </div>
                                <Grid className='pick_up_select_friends' mt={2} container direction='column'>
                                    <span>write here email and name of friends that will witness</span>
                                    <TextField
                                        sx={{margin: '10px 0'}}
                                        type='email'
                                        label='email'
                                        value={selectSpecialFriend.email}
                                        onChange={(e) => setSelectSpecialFriend(prevState => ({
                                            ...prevState,
                                            email: e.target.value
                                        }))}
                                        placeholder='example@gmail.com'
                                    />
                                    <TextField
                                        sx={{margin: '10px 0'}}
                                        type='test'
                                        label='name'
                                        value={selectSpecialFriend.name}
                                        onChange={(e) => setSelectSpecialFriend(prevState => ({
                                            ...prevState,
                                            name: e.target.value
                                        }))}
                                        placeholder='example 100'
                                    />
                                    <Button variant='contained' color='error' onClick={addSpecialFriends}>{collectionSelectSpecialFriend.length ? 'Add more special friend' : 'Add'}</Button>


                                    {collectionSelectSpecialFriend && collectionSelectSpecialFriend.map(item => {
                                        return (
                                            <div key={item.name}>
                                                <Stack direction="row" spacing={1}>
                                                    <Chip label={`${item.name} ${item.email}`} variant="outlined"
                                                          color="success"
                                                          onDelete={() => handleDeleteSelectSpecialFriend(item.name)}/>
                                                </Stack>
                                            </div>
                                        )
                                    })

                                    }
                                </Grid>
                            ____________________________

                            <Grid className='pick_up_receive_friends' mt={2} container direction='column'>
                                <span>write here name of your friends that will be receive testament</span>

                                <TextField
                                    sx={{margin: '10px 0'}}
                                    type='test'
                                    label='name'
                                    value={selectReceiveFriend}
                                    onChange={(e) => setSelectReceiveFriend(e.target.value)}
                                    placeholder='example 100'
                                />
                                <Button variant='contained' color='error' onClick={()=>addReceiveSpecialFriends(selectReceiveFriend)}>{collectionReceiveSpecialFriend.length ? 'Add more receive friend' : 'Add'}</Button>



                                {collectionReceiveSpecialFriend && collectionReceiveSpecialFriend.map(item => {
                                    return (
                                        <div key={item.id}>
                                            <Stack direction="row" spacing={1}>
                                                <Chip label={`${item.name} ${item.email}`} variant="outlined"
                                                      color="success"
                                                      onDelete={() => handleDeleteReceiveFriends(item.name)}/>
                                            </Stack>
                                        </div>
                                    )
                                })}

                            </Grid>
                        </Box>}
                        { /*special Friends*/}




                    </Box>
                    { /*option mode*/}

                </DialogContent>


                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={handleSubmit} autoFocus>submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModelTestament;