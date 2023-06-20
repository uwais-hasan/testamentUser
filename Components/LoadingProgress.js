import React from 'react';
import {Box, CircularProgress} from "@mui/material";
import {useTranslation} from "next-i18next";

const LoadingProgress = () => {
    const{t:translate}=useTranslation('index')

    return (
        <div>

            <Box sx={{display: 'flex' ,justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100vh'}}>

                <CircularProgress size={100}/>
                <p>{translate('loading')}</p>
            </Box>


        </div>
    );
};

export default LoadingProgress;