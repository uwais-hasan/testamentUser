import React from 'react';
import {Box, Grid} from "@mui/material";
import style from "../../styles/details_voting_users.module.scss";
import {useTranslation} from "next-i18next";
import PeopleIcon from '@mui/icons-material/People';


const DetailsVoting = ({data}) => {

    const stateVoting=data.typeTestament==='special Friends'?data.voteSpecialFriends:data.voteUsers;
    const lengthUser=data.typeTestament==='special Friends'?data.selectSpecialFriend.length:data.countLikeUsers
    const total=(stateVoting.length - lengthUser)===0?'he is dead':(  lengthUser - stateVoting.length)
    const{t:translate}=useTranslation('voting')
    return (

        <Box className={style.section_result_vote_user}>
            <h1>{translate('Details Vote')}</h1>
            {data.typeTestament==='public'?<p className={style.no_details}>{translate('isPublic')}</p>:
                <Grid gap={2}  container item columns={{md:12,sx:12}} direction={{ md: 'row', xs: 'column' }}  justifyContent='space-between' >
                    <Grid item container md={3.8}  direction='column' justifyContent='center' alignItems='center' className={style.details_voting}>
                        <PeopleIcon/>
                        <p>{translate('number of the voting')}</p>
                        <p> {stateVoting.length} </p>
                    </Grid>
                    <Grid item container md={3.8} direction='column' alignItems='center' className={style.details_voting}>
                        <PeopleIcon/>
                       <p> {translate('total_number_of_the_voting')}</p>
                        <p > {lengthUser} </p>
                    </Grid>
                    <Grid item container md={3.8} direction='column' alignItems='center' className={style.details_voting}>
                        <PeopleIcon/>
                       <p> {translate('remain votes')}</p>
                        <p > {total} </p >
                    </Grid>
                </Grid>
            }
        </Box>


    );
};

export default DetailsVoting;