import React, {Fragment, useEffect, useState} from 'react';

import useWidth from "../../Hooks/useWidth";
import {Button, Grid} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import styles from "../../styles/content_details_testament.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";

import TestamentUser from "./TestamentUser";
import InteractionTestament from "./InteractionTestament";
import ModelTestament from "../Model/modelTestament";

const InfoTestament = () => {
    const {width}=useWidth()
    const[isTestament,setIsTestament]=useState(true)
    const [open, setOpen] = React.useState(false);


    const [isVisible,setIsVisible]=useState({
        myTestament:true,
        updateTestament:false,
        deleteTestament:false,
        interactionTestament:false,
    })


    // useEffect(()=>{
    //     if (width&&width<=767){
    //         setIsVisible(prevState => ({...prevState, myTestament:false, updateTestament:false, deleteTestament:false, interactionTestament:false,}))
    //
    //     }
    // },[width])

    const checkStatus=(type)=>{
        console.log(type)
        // const obj=Object.keys(isVisible).map(item=>item===type)
        setIsVisible(prevState => ({...prevState, myTestament:false, updateTestament:false, deleteTestament:false, interactionTestament:false,}))
        setIsVisible(prevState => ({...prevState,[type]:true}))

        if (type==='updateTestament'){
            setOpen(true)
        }

    }
    const createOrUpdateTestament=()=>{
        // setIsTestament(!isTestament)
        setOpen(true)
    }


    const btnCreateTestament=()=>{
        return(
            <div className='header_details_testament'>
                <Button onClick={createOrUpdateTestament} variant='contained' fullWidth startIcon={<CreateIcon/>} > CreateTestament</Button>
            </div>
        )
    }
    const buttonsHandleTestament=()=>{
        return(
            <div className={styles.header_details_testament}>
                {width > 768? <Fragment>
                        <Button sx={{width:'25%'}} onClick={()=>checkStatus('myTestament')} variant='contained'  startIcon={<VisibilityIcon/>} > my testament</Button>
                        <Button sx={{width:'25%'}} onClick={()=>checkStatus('updateTestament')} variant='contained'  startIcon={<UpdateIcon/>} > update</Button>
                        <Button sx={{width:'25%'}} onClick={()=>checkStatus('deleteTestament')} variant='contained'  startIcon={<DeleteIcon/>} > delete</Button>
                        <Button sx={{width:'25%'}} onClick={()=>checkStatus('interactionTestament')} variant='contained' startIcon={<FavoriteIcon/>} > interactions</Button>
                    </Fragment>



                    : <Fragment>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid container item gap={1} alignItems='center'><VisibilityIcon/> my testament</Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                               <TestamentUser/>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{width:'100%'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid container item gap={1} alignItems='center'><FavoriteIcon/> interactions</Grid>

                            </AccordionSummary>
                            <AccordionDetails >
                              <InteractionTestament/>
                            </AccordionDetails>
                        </Accordion>
                        <Button fullWidth onClick={createOrUpdateTestament} variant='contained'  startIcon={<UpdateIcon/>} >update</Button>
                        <Button fullWidth onClick={null} variant='contained'  startIcon={<DeleteIcon/>} >delete </Button>

                    </Fragment>

                }
            </div>
        )
    }

    if (open){
        return  <ModelTestament open={open} setOpen={setOpen} setIsTestament={setIsTestament}/>
    }




    return (
        <div className={styles.content_details_testament} >
            {isTestament?buttonsHandleTestament():btnCreateTestament()}

            {width>768&&isTestament&&isVisible.myTestament&&<TestamentUser/>}
            {width>768&&isTestament&&isVisible.updateTestament&&<ModelTestament open={open} setOpen={setOpen} setIsTestament={setIsTestament}/>}
            {width>768&&isTestament&&isVisible.deleteTestament&&<p>deleteTestament</p>}
            {width>768&&isTestament&&isVisible.interactionTestament&&<InteractionTestament/>}
            {!isTestament&&<p>no testament add</p>}
        </div>
    );
};

export default InfoTestament;