import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";

import styleImage from '../../styles/Images.module.scss'
import style from '../../styles/about.user.module.scss'
import {useSelector} from "react-redux";
import {updateData} from "../../Utils/FetchData";

import ModelCheckIsSpecialFriend from '../../Components/Model/modelCheckIsSpecialFriend'
import Confirm from "../Model/Confirm";
import {useRouter} from "next/router";
import AlertNotify from "../Model/AlertNotify";
import {useTranslation} from "next-i18next";
import ModelShowTestamentVotingUsers from "../Model/modelShowTestamentVotingUsers";
import ModelReceiveSpecialFriends from "../Model/modelReceiveSpecialFriends";
const AboutUser = ({data}) => {
    const {auth}=useSelector(state=>state.sliceAuth)
    const[open,setOpen]=useState(false)
    const [openConfirm,setOpenConfirm] = React.useState(false);

    const[showAlert,setShowAlert]=useState(false)
    const[isValid,setIsValid]=useState({status:'',title:''})
    const[showBtnVote,setShowBtnVote]=useState(true)

    const[showBtnTestament,setShowBtnTestament]=useState(false)
    const[showTestament,setShowTestament]=useState(false)
    const[openReceive, setOpenReceive]=useState(false)
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
    const handleShowTestamentUser=()=>{
        const type=data.typeTestament;
        if (type==='special Friends'){
            setOpenReceive(true)
        }else {
            setShowTestament(true)
        }
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
    useEffect(() => {
        if (data.typeTestament === 'votes users') {

            if (data.countLikeUsers === data.voteUsers.length) {
                setShowBtnTestament(true)
            }

        } else if (data.typeTestament === 'special Friends') {
            if (data.selectSpecialFriend.length === data.voteSpecialFriends.length) {
                setShowBtnTestament(true)
            }
        } else if (data.typeTestament === 'public') {
            setShowBtnTestament(true)
        }
    }, [])






    return (
        <Box className={style.content_about_user}>
            {showAlert&&<AlertNotify status={isValid.status}  title={isValid.title} showAlert={showAlert} setShowAlert={setShowAlert} />}
            {openConfirm && <Confirm title={translate('title_voting_users')} description={translate('description_voting_users')} openConfirm={openConfirm} setOpenConfirm={setOpenConfirm} funSubmit={votingUser}/>}
            {showTestament&& <ModelShowTestamentVotingUsers showTestament={showTestament} setShowTestament={setShowTestament} testament={data.testament}/>}
            {openReceive&&<ModelReceiveSpecialFriends showTestament={showTestament} setShowTestament={setShowTestament} openReceive={openReceive} setOpenReceive={setOpenReceive} data={data}/>}
            {open&& <ModelCheckIsSpecialFriend open={open} setOpen={setOpen} data={data}/>}
               <Grid container columns={{xs: 12, md: 12}} alignItems='center'>

                   <Grid item xs={12}  md={12}>
                       <h2 className={style.define_mode}>{translate('type testament')} : {data.typeTestament}</h2>
                   </Grid>

                   <Grid item container md={12} justifyContent='space-between' direction={{md:'row',xs:'column-reverse'}} >

                       <Grid item container md={8.5} xs={12} gap={{xs:2,md:0}}  className={style.box_info_vote}  direction='column'  justifyContent='space-evenly' alignItems='flex-start'>
                           <h1>{data.userId.name}</h1>
                           <>
                               {data.typeTestament !== 'public' &&
                               <>
                                   <span className={style.warning}>{translate('warning_vote')}</span>

                                   <Button
                                       sx={{marginBottom:'3px'}}
                                       className={showBtnVote?style.btn:style.disable}

                                       onClick={() => handleVoting()}
                                       fullWidth
                                       variant='contained'
                                      >
                                       {showBtnVote ? translate('vote') : translate('complete')}
                                   </Button>
                                  {showBtnTestament&& <Button  fullWidth variant='contained' className={style.btn} onClick={handleShowTestamentUser} variant='contained' color='error'>{translate('click_see_testament')}</Button>}

                               </>
                               }
                           </>
                       </Grid>

                       <Grid className={style.imageUser} item md={3} xs={12} >
                           <img className={styleImage.image_rectangular} src={data.userId.picture || ''}/>
                       </Grid>

                   </Grid>

               </Grid>

        </Box>
    );
};

export default AboutUser;