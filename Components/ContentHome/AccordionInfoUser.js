import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from '../../styles/Accordion.module.scss'
import {Box, Grid} from "@mui/material";




const AccordionInfoUser = () => {



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
                               <p className={styles.text}><span>country :</span> <span>lebanon</span></p>
                           </Grid>
                           <Grid item xs={6}>
                               <p className={styles.text}><span>study :</span> <span>ecommerce</span></p>
                           </Grid>
                           <Grid item xs={6}>
                               <p className={styles.text}><span>country :</span> <span>lebanon</span></p>
                           </Grid>
                           <Grid item xs={6}>
                               <p className={styles.text}><span>study :</span> <span>ecommerce</span></p>
                           </Grid>




                      </Grid>


                </AccordionDetails>
            </Accordion>

        </Box>
    );

};

export default AccordionInfoUser;