import React from 'react';
import {Grid} from "@mui/material";
import style from '../styles/app_climpse.module.scss'
import {useTranslation} from "next-i18next";
const AppGlimpse = () => {
    const{t:translate}=useTranslation('register')
    return (
        <Grid container direction='column' className={style.content_appGlimpse}>
            <h1>{translate('brief_app')}</h1>
            <p>{translate('description_app')}</p>
        </Grid>
    );
};

export default AppGlimpse;