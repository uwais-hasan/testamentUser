





import React from 'react';
import {Box, Grid} from "@mui/material";

import styleImg from '../../styles/Images.module.scss'
import style from '../../styles/user_voting_interaction.module.scss'

import moment from "moment";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";





const UserVotingInteraction = ({data}) => {
    const stateVoting=data.typeTestament==='special Friends'?data.voteSpecialFriends:data.voteUsers;


    const{t:translate}=useTranslation('voting')

    return (
        <Box  className={style.content_user_voting_interaction}>

            <h1>{translate('user_interaction')}</h1>

                    <Grid className={style.interaction_user} container item   direction='column'  alignItems='center'>
                        {data.typeTestament==='public'|| !stateVoting.length?<p className={style.no_interaction}>{translate('isInteraction')}</p>:

                            <div>
                                {stateVoting&&stateVoting.map(item=>{
                                    return(
                                        <Grid  flexWrap='no-wrap'  container key={item.name} direction='row' alignItems='center' justifyContent='space-between' >
                                            <img className={styleImg.rounded_image_small} src={item.picture} loading='lazy' alt={item.name}/>
                                            <p style={{maxWidth: '120px'}}>{item.name}</p>
                                            <p>{item.createdAt?moment(item.createdAt).format("M-D-Y"):''}</p>
                                        </Grid>
                                    )
                                })}
                            </div>

                        }
                    </Grid>


        </Box>
    );
};

export default UserVotingInteraction;

export  async function  getStaticProps({locale}){

    return{
        props:{
            trans: {...(await serverSideTranslations(locale, `voting`))},

            ...(await serverSideTranslations(locale,['voting']))
        }
    }
}