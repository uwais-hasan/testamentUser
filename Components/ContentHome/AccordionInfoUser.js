import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from '../../styles/Accordion.module.scss'
import {Box, Grid} from "@mui/material";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";




const AccordionInfoUser = () => {
    const {auth}=useSelector(state=>state.sliceAuth)

    const { t:translate } = useTranslation('index');

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
                               <p className={styles.text}><span>{translate('country')} :</span> <span>{auth.user.country||translate('error_empty_data_setting')}</span></p>
                           </Grid>
                           <Grid item xs={6}>
                               <p className={styles.text}><span>{translate('city')} :</span> <span>{auth.user.city||translate('error_empty_data_setting')}</span></p>
                           </Grid>
                           <Grid item xs={6}>
                               <p className={styles.text}><span>{translate('phone')} :</span> <span>{auth.user.phone||translate('error_empty_data_setting')}</span></p>
                           </Grid>
                           <Grid item xs={6}>
                               <p className={styles.text}><span>{translate('age')} :</span> <span>{auth.user.age||translate('error_empty_data_setting')}</span></p>
                           </Grid>




                      </Grid>


                </AccordionDetails>
            </Accordion>

        </Box>
    );

};

export default AccordionInfoUser;