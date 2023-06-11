





import React from 'react';
import {Box, Container, Grid} from "@mui/material";
import {ResTestamentData} from "../../data";
import styleImg from '../../styles/Images.module.scss'
import style from '../../styles/user_voting_interaction.module.scss'
import stylePara from '../../styles/interaction.testament.module.scss'
import {useSelector} from "react-redux";
import moment from "moment";
import {useTranslation} from "next-i18next";





const UserVotingInteraction = ({data}) => {


    const stateVoting=data.typeTestament==='special Friends'?data.voteSpecialFriends:data.voteUsers;
    const lengthUser=data.typeTestament==='special Friends'?data.selectSpecialFriend.length:data.countLikeUsers

    const total=(stateVoting.length - lengthUser)===0?'he is dead':(  lengthUser - stateVoting.length)
    const{t:translate}=useTranslation('voting')

    return (
        <Box mt={3} className={style.content_user_voting_interaction}>
            <Container>
                <Grid className={stylePara.section_interaction} container columns={{ xs: 12, sm: 12, md: 12 }} justifyContent='flex-end'>

                        <Grid className={style.details} container item md={3} xs={6}  direction='column'>


                               <h1>{translate('Details Vote')}</h1>
                               {data.typeTestament==='public'?translate('isPublic'):
                                   <>
                               <p> {translate('number of the voting')} : <span className={style.color}> {stateVoting.length} </span></p>
                               <p>{translate('total_number_of_the_voting')} :<span className={style.color}> {lengthUser} </span></p>
                               <p>{translate('remain votes')} : <span className={style.color}> {total} </span ></p>
                           </>
                            }
                        </Grid>


                    <Grid item md={3} xs={0} />
                    <Grid className={style.interaction_user} container item md={3.5} xs={6}  direction='column'>
                        {data.typeTestament==='public'|| !stateVoting.length?<p className={stylePara.no_interaction}>{translate('isInteraction')}</p>:

                            <div className={style.listUsers}>
                                {stateVoting?stateVoting.map(item=>{
                                    return(
                                        <Grid  flexWrap='no-wrap' style={{padding:'5px 10px 0 10px'}}  container key={item.name} direction='row' alignItems='center' justifyContent='space-between'>
                                            <img className={styleImg.rounded_image_small} src={item.picture}/>
                                            <p style={{maxWidth: '120px'}}>{item.name}</p>
                                            <p>{item.createdAt?moment(item.createdAt).format("MMMM Do YYYY"):''}</p>
                                        </Grid>
                                    )
                                }):<p>{translate('isInteraction')}</p>}
                            </div>

                        }
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default UserVotingInteraction;