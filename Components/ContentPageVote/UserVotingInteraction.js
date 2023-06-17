





import React from 'react';
import {Box, Container, Grid} from "@mui/material";

import styleImg from '../../styles/Images.module.scss'
import style from '../../styles/user_voting_interaction.module.scss'
import stylePara from '../../styles/interaction.testament.module.scss'
import {useSelector} from "react-redux";
import moment from "moment";
import {useTranslation} from "next-i18next";

const datas = [
    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},

    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},

    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},
    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},
    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},

    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},

    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},
    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},

    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},
    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},
    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},

    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},

    {picture: "12.jpeg", name: "nour nour", createdAt: "2023-06-13T15:40:06.365Z"},


]



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
                                            <img className={styleImg.rounded_image_small} src={item.picture}/>
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