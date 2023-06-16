





import FaceBookLogin from "../Components/Login/FaceBookLogin";
import React, {useEffect, useState} from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ContentHome from "../Components/ContentHome/ContentHome";
import Header from "../Components/Header";
import Layout from "../Components/Layout/Layout";
import Params from "../Components/Testing/Params";
import {useDispatch, useSelector} from "react-redux";
import {addAuth} from "../Store/Slicess/SliceAuth";
import {addTestament} from '../Store/Slicess/SliceTestament'
import {useRouter} from "next/router";
import LoadingProgress from "../Components/LoadingProgress";
import {callTestamentUser, fet, fet2, isAuthAccessToken} from "../Utils/PublicFun";
import Admin from "../Components/admin";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Howtouse from "./Howtouse";
import {useTranslation} from "react-i18next";
import styles from '../styles/App.module.scss'

export const index=({data})=> {
    const[loading,setLoading]=useState(true)
    const {auth}=useSelector(state=>state.sliceAuth)
    const dispatch=useDispatch();
    const router=useRouter();



    useEffect(() => {
        const isUser = localStorage.getItem('isUser')
        if (isUser) {
            return isAuthAccessToken(dispatch)
        } else {
            router.push('/login')
        }

    }, []);


    useEffect(() => {


        if (auth.access_Token) {
            setLoading(false)
            return callTestamentUser(dispatch,auth)
        } else {
            return console.log('error')
        }

    },[auth.access_Token])

    if (loading){
        return <LoadingProgress/>
    }





    return (
        <div className={styles.content_app}>

               {auth.user.role === 'user' ? <>
                       <Header/>
                       <ContentHome/>
                   </> :
                   <Admin/>}

        </div>
    )
}





export  async function  getStaticProps({locale}){

    return{
        props:{
            ...(await serverSideTranslations(locale,['index','footer']))
        }
    }
}

export default index;

