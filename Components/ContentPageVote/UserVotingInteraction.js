import React from 'react';
import {Box, Container, Grid} from "@mui/material";
import {ResTestamentData} from "../../data";
import styleImg from '../../styles/Images.module.scss'
import style from '../../styles/user_voting_interaction.module.scss'
const UserVotingInteraction = () => {
    const data=ResTestamentData.likesUsers
    return (
        <Box mt={3} className={style.content_user_voting_interaction}>
          <Container>
              <Grid container columns={{ xs: 12, sm: 12, md: 12 }} justifyContent='flex-end'>
                  <Grid className={style.details} item md={3}  direction='column'>
                      <h1>Details Vote</h1>
                      <p> number of the voting : <span className={style.color}> 30 </span></p>
                      <p>total number of the voting :<span className={style.color}> 1 </span></p>
                      <p>remain votes : <span className={style.color}>  2 </span ></p>
                  </Grid>
                  <Grid item md={3} />
                  <Grid className={style.interaction_user} container md={3.5} xs={8}  direction='column'>
                     <div className={style.listUsers}>
                         {data.map(item=>{
                             return(
                                 <Grid  flexWrap='no-wrap' style={{padding:'5px 10px 0 10px'}}  container key={item.name} direction='row' alignItems='center' justifyContent='space-between'>
                                     <img className={styleImg.rounded_image_small} src={item.imgUser}/>
                                     <p style={{maxWidth: '120px'}}>{item.name}</p>
                                     <p>{item.date}</p>
                                 </Grid>
                             )
                         })}
                     </div>
                  </Grid>
              </Grid>
          </Container>
        </Box>
    );
};

export default UserVotingInteraction;