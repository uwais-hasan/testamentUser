import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
const Confirm = ({title,description,type,openConfirm,setOpenConfirm,funSubmit,setImage,image}) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const[loading,setLoading]=useState(false)
    const {t: translate} = useTranslation('index')


    const handleClose = () => {
        setOpenConfirm(false);
        if (type==='updatePicture'){

            setImage('')
        }

    };

    const handleSubmit = async () => {
        setLoading(true)
       await funSubmit()




    }



    return (
        <div>

            <Dialog
                sx={{height:type==='updatePicture'?'69%':'100%'}}
                fullScreen={fullScreen}
                open={openConfirm}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                    {type==='updatePicture'&&<div style={{textAlign:'center',paddingTop:'20px'}}>
                        <img style={{width:' 200px', borderRadius: '50%',height:'200px',}} src={image?URL.createObjectURL(image):auth.user.picture}/>

                    </div>}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        {translate('cancel')}
                    </Button>
                    <Button onClick={handleSubmit} autoFocus>

                        {loading?translate('loading'):translate('agree')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Confirm;