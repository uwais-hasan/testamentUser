





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
import {callTestamentUser, fet, fet2, getUsers, isAuthAccessToken} from "../Utils/PublicFun";
import Admin from "../Components/admin";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Howtouse from "./Howtouse";
import {useTranslation} from "react-i18next";
import styles from '../styles/App.module.scss'

export const index=({data})=> {


    const[loading,setLoading]=useState(false)
    const {auth}=useSelector(state=>state.sliceAuth)
    const [users, setUsers] = useState([])

    const[isRoute,setIsRoute]=useState(false)
    const dispatch=useDispatch();
    const router=useRouter();


    const IsAdminOrUser = async () => {
        setLoading(true)
        if (auth.access_Token) {
            if (auth?.user?.role === 'user') {

                await callTestamentUser(dispatch, auth)
                setLoading(false)
            } else {
                const dataUser = await getUsers(auth)
                setUsers(dataUser)
                setLoading(false)
            }
        }

    }
    const IsAuth = async () => {
        setLoading(true)
        const isUser = localStorage.getItem('isUser')
        if (isUser) {
            await isAuthAccessToken(dispatch)
            setLoading(false)
        } else {
            router.push('/login')
        }
    }



const en=process.env.URL_BASIC




    useEffect(() => {
        IsAuth()
        IsAdminOrUser()


    }, [auth.access_Token])

    if (loading){
        return <LoadingProgress/>
    }





    return (
        <div className={styles.content_app}>
<p className='sssssssssssssss'>{en}</p>
               {auth?.user?.role === 'user' ? <>
                       <Header/>
                       <ContentHome/>
                   </> :
                   <Admin users={users}/>}

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

