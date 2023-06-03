import React, {useState} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";

import styleImage from '../../styles/Images.module.scss'
import style from '../../styles/about.user.module.scss'
import {useSelector} from "react-redux";
import {updateData} from "../../Utils/FetchData";

import ModelCheckIsSpecialFriend from '../../Components/Model/modelCheckIsSpecialFriend'
import Confirm from "../Model/Confirm";
import {useRouter} from "next/router";
import AlertNotify from "../Model/AlertNotify";
const AboutUser = ({data}) => {
    const {auth}=useSelector(state=>state.sliceAuth)
    const[open,setOpen]=useState(false)
    const [openConfirm,setOpenConfirm] = React.useState(false);
    const[showAlert,setShowAlert]=useState(false)
    const[isValid,setIsValid]=useState({status:'',title:''})
    const router=useRouter()

    const votingUser = async () => {
        const type = data.typeTestament;

        const isDouble = data.voteUsers.find(item => item.email === auth.user.email);

        if (isDouble === undefined) {

            await updateData('user/vote', {id: data._id, type, voteUsers: auth.user._id})
            router.reload()
        } else {

            setShowAlert(true);
            setIsValid({...isValid,title: 'this user already vote',status:'error'})
        }


    }


    const handleVoting = async () => {

        const type = data.typeTestament;

        if (!auth.user && type === 'votes users') {

            setShowAlert(true);
            setIsValid({...isValid,title: 'you can not like please login',status:'error'})
        } else if (auth.user && type === 'votes users') {

            setOpenConfirm(true)

        } else if (type === 'special Friends') {
            setOpen(true)

        }


    }



    if (open) {
        return (
            <ModelCheckIsSpecialFriend open={open} setOpen={setOpen} data={data}/>
        )
    }

    if (openConfirm){
        return <Confirm
            title='voting user'
            description='are you sure want to vote?'
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
            funSubmit={votingUser}
        />
    }

    return (
        <Box className={style.content_about_user}>
            {showAlert&&<AlertNotify status={isValid.status}  title={isValid.title} showAlert={showAlert} setShowAlert={setShowAlert} />}

           <Container>

               <Grid container columns={{ xs: 12, sm: 12, md: 12 }} >
                   <Grid  item md={6} xs={4} >
                       <img className={styleImage.image_rectangular} src={data.userId.picture||''}/>
                   </Grid>

                   <Grid item container md={6} xs={8}  direction='column' alignItems='center'>
                       <Grid item>
                           <p className={style.define_mode}>type testament : {data.typeTestament}</p>
                       </Grid>
                       <Grid item>
                           <p className={style.name}>{data.userId.name}</p>
                       </Grid>
                       <Grid item>
                           <p className={style.text}>he is a <span className={style.isAlive}>Alive</span></p>

                       </Grid>



                       <Grid container direction='column' alignItems='center'>
                           <h1 className={style.note} >note</h1>
                           <ul className={style.listAdvise}>
                               <li>asdasdasdasdasdasdasdsad</li>
                               <li>asdasdasdasdasdasdasdsad</li>
                               <li>asdasdasdasdasdasdasdsad</li>
                               <li>asdasdasdasdasdasdasdsad</li>

                           </ul>
                           <span className={style.warning}>warning asasdasdasdasdsadasdasdasdas</span>
                           <Button onClick={()=>handleVoting()} fullWidth variant='contained' color='primary'>Vote</Button>
                       </Grid>
                   </Grid>

               </Grid>
           </Container>
        </Box>
    );
};

export default AboutUser;