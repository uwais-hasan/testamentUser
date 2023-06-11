import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";

import styleImage from '../../styles/Images.module.scss'
import style from '../../styles/about.user.module.scss'
import {useSelector} from "react-redux";
import {updateData} from "../../Utils/FetchData";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModelCheckIsSpecialFriend from '../../Components/Model/modelCheckIsSpecialFriend'
import Confirm from "../Model/Confirm";
import {useRouter} from "next/router";
import AlertNotify from "../Model/AlertNotify";
import {useTranslation} from "next-i18next";
const AboutUser = ({data}) => {
    const {auth}=useSelector(state=>state.sliceAuth)
    const[open,setOpen]=useState(false)
    const [openConfirm,setOpenConfirm] = React.useState(false);
    const[showAlert,setShowAlert]=useState(false)
    const[isValid,setIsValid]=useState({status:'',title:''})
    const[showBtnVote,setShowBtnVote]=useState(true)
    const{t:translate}=useTranslation('voting')
    const router=useRouter()

    const votingUser = async () => {
        const type = data.typeTestament;

        const isDouble = data.voteUsers.find(item => item.email === auth.user.email);

        if (isDouble === undefined) {

            await updateData('user/vote', {id: data._id, type, voteUsers: auth.user._id})
            router.reload()
        } else {

            setShowAlert(true);
            setIsValid({...isValid,title: translate('error_already_vote'),status:'error'})
        }


    }



    const goLogout = () => {
        router.push('/login')
    };

    const timer = () => {


        setTimeout(() => {

            goLogout();



        }, 2000);
    };
    const handleVoting = async () => {

        const type = data.typeTestament;

        if (!auth.user && type === 'votes users') {

            setShowAlert(true);
            setIsValid({...isValid,title: translate('error_user_cannot_like'),status:'error'})
            timer()

        } else if (auth.user && type === 'votes users') {

            setOpenConfirm(true)

        } else if (type === 'special Friends') {
            setOpen(true)

        }


    }
    const handleBackHome=()=>{
        router.push('/')
    }
    useEffect(() => {
        if (data.typeTestament === 'votes users') {

            if (data.countLikeUsers === data.voteUsers.length) {
                setShowBtnVote(false)
            }

        } else if (data.typeTestament === 'special Friends') {
            if (data.selectSpecialFriend.length === data.voteSpecialFriends.length) {
                setShowBtnVote(false)
            }
        } else if (data.typeTestament === 'public') {
            setShowBtnVote(false)
        }
    }, [])

    if (open) {
        return (
            <ModelCheckIsSpecialFriend open={open} setOpen={setOpen} data={data}/>
        )
    }

    if (openConfirm){
        return <Confirm
            title={translate('title_voting_users')}
            description={translate('description_voting_users')}
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
            funSubmit={votingUser}
        />
    }

    return (
        <Box className={style.content_about_user}>
            {showAlert&&<AlertNotify status={isValid.status}  title={isValid.title} showAlert={showAlert} setShowAlert={setShowAlert} />}

           <Container>
               {auth.user&&<ArrowBackIcon onClick={handleBackHome}   className={style.back_home}/>}
               <Grid container columns={{ xs: 12, sm: 12, md: 12 }} >
                   <Grid  item md={6} xs={4} >
                       <img className={styleImage.image_rectangular} src={data.userId.picture||''}/>
                   </Grid>

                   <Grid item container md={6} xs={8}  direction='column' alignItems='center'>
                       <Grid item>
                           <p className={style.define_mode}>{translate('type testament')} : {data.typeTestament}</p>
                       </Grid>
                       <Grid item>
                           <p className={style.name}>{data.userId.name}</p>
                       </Grid>




                       <Grid container direction='column' alignItems='center'>
                           <h1 className={style.note} >{translate('notice')}</h1>
                           <ul className={style.listAdvise}>
                               <li>{translate('note_1')}</li>
                               <li>{translate('note_2')}</li>
                               <li>{translate('note_3')}</li>
                               <li>{translate('note_4')}</li>


                           </ul>
                           {data.typeTestament !== 'public' &&
                          <>
                              <span className={style.warning}>{translate('warning_vote')}</span>

                              <Button
                                  disabled={!showBtnVote}
                                  onClick={() => handleVoting()}
                                  fullWidth
                                  variant='contained'
                                  color='primary'>
                                  {showBtnVote ? translate('vote') : translate('complete')}
                              </Button>
                          </>


                           }

                       </Grid>
                   </Grid>

               </Grid>
           </Container>
        </Box>
    );
};

export default AboutUser;