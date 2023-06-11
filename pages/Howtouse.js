import React, {useEffect, useRef} from 'react';

import {Box, Button, Container, Grid} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import GroupIcon from "@mui/icons-material/Group";
import KeyIcon from "@mui/icons-material/Key";
import style from '../styles/howtouse.module.scss'
import Layout from "../Components/Layout/Layout";
import {useTranslation} from "react-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {isAuthAccessToken} from "../Utils/PublicFun";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
const HowToUse = () => {
    const box_public=useRef(null)
    const  box_Users_voting=useRef(null)
    const  box_Special_Friends=useRef(null)
    const handleBoxClick = (boxRef) => {
        boxRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const { t:translate } = useTranslation('howtouse');
    const dispatch=useDispatch();
    const router=useRouter();
    useEffect(() => {
        const isUser = localStorage.getItem('isUser')
        if (isUser) {
            return isAuthAccessToken(dispatch)
        }

    }, []);




    return (

        <div className={style.page_how_to_use} >
         <Container>
             <Box className='overView_website'>
                 <h1>{translate('overview_website')}</h1>
                 <p>
                     {translate('overview_website_text')}
                 </p>
             </Box>
             <Box className='whyUseWebSite'>
                 <h1>{translate('whyUseWebsite')}</h1>
                 <p>
                     {translate('whyUseWebsite_text')}

                 </p>
             </Box>
             <Box className="feature">
                 <h2>{translate('feature')}</h2>

                   <ul> {translate('feature_text',{ returnObjects: true }).map((item,index)=>(<li key={index}>{item}</li>))}</ul>

             </Box>
             <Box className='boxes_how_to-use'>
                 <h2>{translate('mode')}</h2>
                 <Grid container columns={{md: 12, xs: 12}} justifyContent='center' alignItems='center' gap={3}
                      >
                     <Grid item container onClick={() => handleBoxClick(box_public)} className={style.box_using} md={3} xs={12} gap={2} justifyContent='center' alignItems='center' >
                         <PublicIcon/>
                         <p>{translate('public')}</p>
                     </Grid>
                     <Grid item container onClick={() => handleBoxClick(box_Users_voting)} className={style.box_using}  md={3} xs={12} gap={2} justifyContent='center' alignItems='center'>
                         <GroupIcon/>
                         <p>{translate('Users voting')}</p>
                     </Grid>
                     <Grid  item container onClick={() => handleBoxClick(box_Special_Friends)} className={style.box_using}  md={3} xs={12} gap={2} justifyContent='center' alignItems='center'>
                         <KeyIcon/>
                         <p>{translate('special Friends')}</p>
                     </Grid>
                 </Grid>
             </Box>
             <Box className="how_to-use">
                 <h2>{translate('howToUseWebsite')}</h2>
                 <ul>
                     {translate('howUseWebsite_text',{returnObjects:true}).map((item,index)=><li key={index}>{item}</li>)}
                 </ul>
             </Box>
             <Box className='Choosing the mode'>
                 <Box ref={box_public} className={style.mode}>
                     <Grid container columnSpacing={{md: 12, xs: 12}}>
                         <Grid md={6} xs={12} item>
                             <h2>{translate('public')}</h2>
                             <p>{translate('mode_public_text')}</p>
                         </Grid>

                         <Grid md={6} xs={12} item>
                             <img src='./public.png'/>
                         </Grid>
                     </Grid>
                 </Box>
                 <Box ref={box_Users_voting} className={style.mode}>
                     <Grid container columnSpacing={{md: 12, xs: 12}}>
                         <Grid md={6} xs={12} item>
                             <img src='./voting_users.png'/>
                         </Grid>
                         <Grid md={6} xs={12} item>
                             <h2>{translate('Users voting')}</h2>
                             <p>{translate('mode_users_voting_text')}</p>
                         </Grid>


                     </Grid>

                 </Box>
                 <Box ref={box_Special_Friends} className={style.mode}>
                     <Box className={style.mode}>
                         <Grid container columnSpacing={{md: 12, xs: 12}}>
                             <Grid md={6} xs={12} item>
                                 <h2>{translate('special Friends')}</h2>
                                 <ul>
                                     {translate('mode_special_friends_text',{returnObjects:true}).map((item,index)=><li key={index}>{item}</li>)}
                                 </ul>

                             </Grid>

                             <Grid md={6} xs={12} item>
                                 <img src='./special_friends.png'/>
                                 <img src='./recieve_friends.png'/>
                             </Grid>
                         </Grid>

                     </Box>

                 </Box>
             </Box>
         </Container>
        </div>

    );
};




export  async function  getStaticProps({locale}){

    return{
        props:{
            ...(await serverSideTranslations(locale,['howtouse']))
        }
    }
}

export default HowToUse;