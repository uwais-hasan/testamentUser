import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from '../../styles/Accordion.module.scss'
import {Box, Grid} from "@mui/material";
import {useSelector} from "react-redux";




const AccordionInfoUser = () => {
    const {auth}=useSelector(state=>state.sliceAuth)



    return (
        <Box className={styles.app_accordion} >

            <Accordion  sx={{boxShadow:'none'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon fontSize='large' />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >

                </AccordionSummary>
                <AccordionDetails>

                       <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent='center'>
                           <Grid item xs={6}>
                               <p className={styles.text}><span>country :</span> <span>{auth.user.country||'The field has not been added yet'}</span></p>
                           </Grid>
                           <Grid item xs={6}>
                               <p className={styles.text}><span>city :</span> <span>{auth.user.city||'The field has not been added yet'}</span></p>
                           </Grid>
                           <Grid item xs={6}>
                               <p className={styles.text}><span>phone :</span> <span>{auth.user.phone||'The field has not been added yet'}</span></p>
                           </Grid>
                           <Grid item xs={6}>
                               <p className={styles.text}><span>age :</span> <span>{auth.user.age||'The field has not been added yet'}</span></p>
                           </Grid>




                      </Grid>


                </AccordionDetails>
            </Accordion>

        </Box>
    );

};

export default AccordionInfoUser;