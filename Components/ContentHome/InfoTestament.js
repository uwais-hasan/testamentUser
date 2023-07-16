import React, {Fragment, useState} from 'react';

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
import {useSelector} from "react-redux";
import {deleteData} from "../../Utils/FetchData";
import Confirm from "../Model/Confirm";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";


const InfoTestament = () => {
    const {width} = useWidth()
    const {testamentUser} = useSelector(state => state.sliceTestament)
    const {auth} = useSelector(state => state.sliceAuth)
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);

    const [isVisible, setIsVisible] = useState({
        myTestament: true,
        updateTestament: false,
        deleteTestament: false,
        interactionTestament: false,
    })
    const {t: translate} = useTranslation('index')


    const showDeleteModel=()=>{
        setOpenConfirm(true)
    }
    const deleteTestament=async()=>{
       await deleteData('testament',auth.access_Token)
        router.reload()
    }
    const checkStatus=(type)=>{
        console.log(type)
        setIsVisible(prevState => ({...prevState, myTestament:false, updateTestament:false, deleteTestament:false, interactionTestament:false,}))
        setIsVisible(prevState => ({...prevState,[type]:true}))

        if (type==='updateTestament'){
            setOpen(true)
        }

    }
    const createOrUpdateTestament=()=>{

        setOpen(true)
    }


    const btnCreateTestament=()=>{
        return(
            <div className='header_details_testament'>
                <Button onClick={createOrUpdateTestament} variant='contained' fullWidth startIcon={<CreateIcon/>} > {translate('create_testament')}</Button>
            </div>
        )
    }
    const buttonsHandleTestament=()=>{
        return(
            <div className={styles.header_details_testament}>
                {width > 768? <Fragment>
                        <Button sx={{width:'25%'}} onClick={()=>checkStatus('myTestament')} variant='contained'  startIcon={<VisibilityIcon sx={{marginLeft:'8px'}}/>} >{translate('my testament')}</Button>
                        <Button sx={{width:'25%'}} onClick={()=>checkStatus('updateTestament')} variant='contained'  startIcon={<UpdateIcon sx={{marginLeft:'8px'}}/>} >{translate('update')} </Button>
                        <Button sx={{width:'25%'}} onClick={showDeleteModel} variant='contained'  startIcon={<DeleteIcon/>} >{translate('delete') }</Button>
                        <Button sx={{width:'25%'}} onClick={()=>checkStatus('interactionTestament')} variant='contained' startIcon={<FavoriteIcon sx={{marginLeft:'8px'}}/>} >{translate('interactions')} </Button>
                    </Fragment>



                    : <Fragment>

                        <Accordion sx={{width:'100%'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid container item gap={1} alignItems='center'><VisibilityIcon/>{translate('my testament')}</Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                               <TestamentUser testament={testamentUser.testament}/>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion sx={{width:'100%'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid container item gap={1} alignItems='center'><FavoriteIcon/> {translate('interactions')}</Grid>

                            </AccordionSummary>
                            <AccordionDetails >
                              <InteractionTestament/>
                            </AccordionDetails>
                        </Accordion>
                        <Button fullWidth onClick={createOrUpdateTestament} variant='contained'  startIcon={<UpdateIcon/>} >{translate('update')}</Button>
                        <Button fullWidth onClick={showDeleteModel} variant='contained'  startIcon={<DeleteIcon/>} >{translate('delete')} </Button>

                    </Fragment>

                }
            </div>
        )
    }

    if (openConfirm){
        return <Confirm
            title={translate('delete_testament')}
            description={translate('description_delete_testament')}
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
            funSubmit={deleteTestament}


        />
    }
    if (open){
        return  <ModelTestament open={open} setOpen={setOpen} />
    }





    return (
        <div className={styles.content_details_testament} >
            {testamentUser.statusTestament?buttonsHandleTestament():btnCreateTestament()}

            {width>768&&testamentUser.statusTestament&&isVisible.myTestament&&<TestamentUser testament={testamentUser.testament}/>}
            {width>768&&testamentUser.statusTestament&&isVisible.interactionTestament&&<InteractionTestament/>}



        </div>
    );
};

export default InfoTestament;