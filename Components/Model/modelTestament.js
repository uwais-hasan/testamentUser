







import React, { useState} from 'react';


import {Box, TextField,DialogTitle,DialogContent,DialogActions,Dialog,Button,InputLabel,MenuItem,FormControl,Select,Chip,Stack,Grid} from "@mui/material";

import styles from '../../styles/model_testament.module.scss'

import {postData, updateData} from "../../Utils/FetchData";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import AlertNotify from "./AlertNotify";



const ModelTestament = ({open,setOpen}) => {
    const router=useRouter()
    const {testamentUser}=useSelector(state=>state.sliceTestament)
    const {auth}=useSelector(state=>state.sliceAuth)
    const[writeTestament,setWriteTestament]=useState(testamentUser.testament||'')
    const kindOfTestament=['public','votes users','special Friends']
    const[selectTypeTestament,setSelectTypeTestament]=useState('');
    const[selectSpecialFriend,setSelectSpecialFriend]=useState({email:'',name:'',password:''})
    const[selectReceiveFriend,setSelectReceiveFriend]=useState('')
    const[selectCountLikeFriend,setSelectCountLikeFriend]=useState(testamentUser.countLikeUsers||0)
    const[collectionSelectSpecialFriend,setCollectionSelectSpecialFriend]=useState(testamentUser.selectSpecialFriend||[])
    const[collectionReceiveSpecialFriend,setCollectionReceiveSpecialFriend]=useState(testamentUser.selectReceiveFriend||[])
     const[showAlert,setShowAlert]=useState(false)
    const[isValid,setIsValid]=useState({status:'',title:''})

    const handleClose = () => {
        setOpen(false);
    };


    const data={
        typeTestament:selectTypeTestament,
        testament:writeTestament,
        selectSpecialFriend:collectionSelectSpecialFriend,
        selectReceiveFriend: collectionReceiveSpecialFriend,
        countLikeUsers:selectCountLikeFriend,
        statusTestament:true,
    }

    const addSpecialFriends = async () => {

        if (!selectSpecialFriend.email||!selectSpecialFriend.name||!selectSpecialFriend.password){
            setShowAlert(true);
            setIsValid({...isValid,title: 'please add all fields',status:'error'})
        }else {



            const data={
                name:selectSpecialFriend.name,
                email:selectSpecialFriend.email,
                password:selectSpecialFriend.password,
                type:'select special friends',
            }

            const addUser=await postData('user/check',data,auth.access_Token)
            setShowAlert(true);
            setIsValid({...isValid,title: 'you add a special user',status:'success'})
            setCollectionSelectSpecialFriend([...collectionSelectSpecialFriend,addUser])
            setSelectSpecialFriend({...selectSpecialFriend,name:'',email: '',password:''})

        }


    }

    const addReceiveSpecialFriends=(name)=>{
        const existName=collectionSelectSpecialFriend.find(item=>item.name===selectReceiveFriend)
        const checkDoubleName=collectionReceiveSpecialFriend.some(item=>item.name===name)


        if (!selectReceiveFriend){
            setShowAlert(true);
            setIsValid({...isValid,title: 'please add a name',status:'error'})

        } else if (!existName){
            setShowAlert(true);
            setIsValid({...isValid,title: 'this name is not exist',status:'error'})

        }else if (existName !== undefined) {
            if (checkDoubleName){
                setShowAlert(true);
                setIsValid({...isValid,title: 'this email already exist',status:'error'})

            }else{
                setCollectionReceiveSpecialFriend([...collectionReceiveSpecialFriend,existName])
                setSelectReceiveFriend('')
                setShowAlert(true);
                setIsValid({...isValid,title: 'you add a user',status:'success'})
            }

        }

    }

    const handleDeleteSelectSpecialFriend=(email)=>{

        const filtered= collectionSelectSpecialFriend.filter(item=>item.email!==email)
        setCollectionSelectSpecialFriend(filtered)
        setShowAlert(true);
        setIsValid({...isValid,title: 'you delete a special user',status:'success'})
    }
    const handleDeleteReceiveFriends=(name)=>{
        const filtered= collectionReceiveSpecialFriend.filter(item=>item.name!==name)
        setCollectionReceiveSpecialFriend(filtered)
        setShowAlert(true);
        setIsValid({...isValid,title: 'you delete a receive  user',status:'success'})
    }



    const updateDataTestament=async (data,)=>{
        const update=await updateData('testament',data,auth.access_Token)
        if (update.err) return  console.log('err')
        return  router.reload()
    }
    const createDataTestament=async (data)=>{
        const update=await postData('testament', data, auth.access_Token)
        if (update.err) return  console.log('err')
       return  router.reload()
    }
    const handleSubmit = async () => {
        console.log(collectionSelectSpecialFriend)
        if (selectTypeTestament==='special Friends'){
            if (!collectionSelectSpecialFriend.length || !collectionReceiveSpecialFriend.length || !writeTestament){
                setShowAlert(true);
                setIsValid({...isValid,title: 'please add all fields 1',status:'error'})
            }else {
             return  await createDataTestament(data)

            }
        }
        else if (selectTypeTestament==='votes users'){
            if (!selectCountLikeFriend || !writeTestament){
                setShowAlert(true);
                setIsValid({...isValid,title: 'please add all fields 2',status:'error'})
            }else {

                return  await createDataTestament(data)
            }
        }
        else if (selectTypeTestament==='public') {
            if (!writeTestament){
                setShowAlert(true);
                setIsValid({...isValid,title: 'please add testament',status:'error'})
            }

            return  await createDataTestament(data)
        }else {

            setShowAlert(true);
            setIsValid({...isValid,title: 'please select any type',status:'error'})
        }




    }

    const handleUpdate=async ()=>{
        if (selectTypeTestament==='special Friends'){
            if (!collectionSelectSpecialFriend.length || !collectionReceiveSpecialFriend.length || !writeTestament){

                setShowAlert(true);
                setIsValid({...isValid,title: 'please add all fields',status:'error'})
            }else {

             return  await updateDataTestament(data)
            }
        }
        else if (selectTypeTestament==='votes users'){
            if (!selectCountLikeFriend|| !writeTestament){
                setShowAlert(true);
                setIsValid({...isValid,title: 'please add all fields',status:'error'})
            }else {
              return   await updateDataTestament(data)

            }
        }
        else if (selectTypeTestament==='public') {
            if (!writeTestament){
                setShowAlert(true);
                setIsValid({...isValid,title: 'please add testament',status:'error'})
            }

            let data={
                typeTestament:selectTypeTestament,
                testament:writeTestament,
                selectSpecialFriend:[],
                selectReceiveFriend: [],
                countLikeUsers:0,
                statusTestament:true,
            }
          return   await updateDataTestament(data)

        }
        else {

            setShowAlert(true);
            setIsValid({...isValid,title: 'please select any type',status:'error'})
        }

    }



    return (
        <div  className={styles.content_model_testament}>
            {showAlert&&<AlertNotify status={isValid.status}  title={isValid.title} showAlert={showAlert} setShowAlert={setShowAlert} />}
            <Dialog fullWidth
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {testamentUser.statusTestament?<p>updateTestament</p>:  <p>create testament</p>}




                </DialogTitle>

                <DialogContent>

                    <div className='create_testament'>
                        <TextField
                            id="filled-textarea"
                            label="Testament"
                            multiline
                            rows={6}
                            fullWidth
                            variant="filled"
                            value={writeTestament}
                            onChange={(e)=>setWriteTestament(e.target.value)}
                        />

                    </div>
                    {testamentUser?<p>change mode</p>:<div>add mode</div>}

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
                                onChange={(e)=>setSelectCountLikeFriend(e.target.valueAsNumber)}
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
                                    type='text'
                                    label='name'
                                    value={selectSpecialFriend.name}
                                    onChange={(e) => setSelectSpecialFriend(prevState => ({
                                        ...prevState,
                                        name: e.target.value
                                    }))}
                                    placeholder='example 100'
                                />
                                <TextField
                                    sx={{margin: '10px 0'}}
                                    type='text'
                                    label='password'
                                    value={selectSpecialFriend.password}
                                    onChange={(e) => setSelectSpecialFriend(prevState => ({
                                        ...prevState,
                                        password: e.target.value
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
                                                      onDelete={() => handleDeleteSelectSpecialFriend(item.email)}/>
                                                <p>{item.isExist?'true':'false'}</p>
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
                                        <div key={Math.random()*10}>
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
                    {testamentUser.statusTestament?<Button onClick={handleUpdate} autoFocus>update</Button>: <Button onClick={handleSubmit} autoFocus>submit</Button>}
                </DialogActions>



            </Dialog>
        </div>
    );
};

export default ModelTestament