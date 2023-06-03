import React from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";

const LoadingProgress = () => {
    return (
        <div>

            <Box sx={{display: 'flex' ,justifyContent:'center',alignItems:'center',flexDirection:'column',height:'100vh'}}>

                <CircularProgress size={100}/>
                <p>loading...</p>
            </Box>


        </div>
    );
};

export default LoadingProgress;