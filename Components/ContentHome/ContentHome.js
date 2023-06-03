import React, {useEffect} from 'react';
import InfoUser from "./InfoUser";
import InfoTestament from "./InfoTestament";
import style from '../../styles/content_home.module.scss'
import {Box, Container} from "@mui/material";
import {useSelector} from "react-redux";


const ContentHome = () => {





    return (
        <Box  className={style.content_home}>
         <Container>

             <InfoUser/>
             <InfoTestament/>
         </Container>
        </Box>
    );
};

export default ContentHome;