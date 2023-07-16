






import React, {useEffect, useState} from "react";

import ContentHome from "../Components/ContentHome/ContentHome";
import Header from "../Components/ContentHome/Header";

import {useDispatch, useSelector} from "react-redux";

import {useRouter} from "next/router";
import LoadingProgress from "../Components/LoadingProgress";
import {callTestamentUser, getUsers, isAuthAccessToken} from "../Utils/PublicFun";
import Admin from "../Components/admin";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import styles from '../styles/App.module.scss'

export const index=(trans)=> {


    console.log('index',trans)


    const[loading,setLoading]=useState(false)
    const {auth}=useSelector(state=>state.sliceAuth)
    const [users, setUsers] = useState([])


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
          return   router.push('/login')
        }
    }








    useEffect(() => {
        IsAuth()
        IsAdminOrUser()


    }, [auth.access_Token])

    if (loading){
        return <LoadingProgress/>
    }





    return (
        <div className={styles.content_app}>

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


            ...(await serverSideTranslations(locale,['index']))
        }
    }
}

export default index;

