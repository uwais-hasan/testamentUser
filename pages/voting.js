








import React, {useEffect, useState} from 'react';
import AboutUser from "../Components/ContentPageVote/AboutUser";
import UserVotingInteraction from "../Components/ContentPageVote/UserVotingInteraction";

import style from '../styles/content_page_vote.module.scss'
import {addAuth} from "../Store/Slicess/SliceAuth";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Grid} from "@mui/material";
import ModelReceiveSpecialFriends from "../Components/Model/modelReceiveSpecialFriends";
import ModelShowTestamentVotingUsers from "../Components/Model/modelShowTestamentVotingUsers";
import {isAuthAccessToken} from "../Utils/PublicFun";
import LoadingProgress from "../Components/LoadingProgress";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import DetailsVoting from "../Components/ContentPageVote/DetailsVoting";

const voting = ({data}) => {






    const{t:translate}=useTranslation('voting')
    const dispatch=useDispatch();



    if (Object.keys(data).length === 0) {
        return <h1>no testament</h1>
    }


    useEffect(() => {
        const isUser = localStorage.getItem('isUser')
        if (isUser) {
            return isAuthAccessToken(dispatch)
        }

    }, []);
    return (
        <div className={style.content_page_vote}>

         <Container maxWidth='xl'>
             <Grid gap={3}  container columns={{md:12,sx:12}} direction={{xs:'column-reverse',md:'row'}} >
                 <Grid item container md={3} sx={{justifyContent:'center'}}>
                     <UserVotingInteraction data={data}/>
                 </Grid>
                 <Grid item container md={8}>
                     <AboutUser data={data}/>
                     <DetailsVoting data={data}/>
                 </Grid>
             </Grid>
         </Container>



        </div>
    );
};

export default voting;



export const getServerSideProps=async ({query,locale})=>{

    const res=await fetch(`http://localhost:3000/api/user/vote?id=${query.id}`)
    const data=await res.json()

    return{
        props:{
            data,
            ...(await serverSideTranslations(locale, ['voting'])),
        }
    }
}