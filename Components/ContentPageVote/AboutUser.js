import React from 'react';
import {Box, Button, Container, Grid} from "@mui/material";

import styleImage from '../../styles/Images.module.scss'
import style from '../../styles/about.user.module.scss'
const AboutUser = () => {
    return (
        <Box className={style.content_about_user}>
           <Container>

               <Grid container columns={{ xs: 12, sm: 12, md: 12 }} >
                   <Grid  item md={6} xs={4} >
                       <img className={styleImage.image_rectangular} src='./SA.jpg'/>
                   </Grid>
                   <Grid container md={6} xs={8}  direction='column' alignItems='center'>
                       <Grid item>
                           <p className={style.define_mode}>just special friend can be voting</p>
                       </Grid>
                       <Grid item>
                           <p className={style.name}>owies hassan</p>
                       </Grid>
                       <Grid item>
                           <p className={style.text}>he is a <span className={style.isAlive}>Alive</span></p>

                       </Grid>
                       {/*<Grid container direction='row' justifyContent='space-around'>*/}
                       {/*    <p className={style.more_info}>age : 10</p>*/}
                       {/*    <p className={style.more_info}>counter : 10</p>*/}
                       {/*</Grid>*/}


                       <Grid container direction='column' alignItems='center'>
                           <h1 className={style.note} >note</h1>
                           <ul className={style.listAdvise}>
                               <li>asdasdasdasdasdasdasdsad</li>
                               <li>asdasdasdasdasdasdasdsad</li>
                               <li>asdasdasdasdasdasdasdsad</li>
                               <li>asdasdasdasdasdasdasdsad</li>

                           </ul>
                           <span className={style.warning}>warning asasdasdasdasdsadasdasdasdas</span>
                           <Button fullWidth variant='contained' color='primary'>Vote</Button>
                       </Grid>
                   </Grid>

               </Grid>
           </Container>
        </Box>
    );
};

export default AboutUser;