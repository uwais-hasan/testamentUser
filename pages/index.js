


import styles from '../styles/Home.module.css'
import FaceBookLogin from "../Components/Login/FaceBookLogin";
import {useEffect, useState} from "react";
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


export const index=({data})=> {
    const[loading,setLoading]=useState(true)
    const {auth}=useSelector(state=>state.sliceAuth)

// complete in page voting loading you don't do any thing yet

    const dispatch=useDispatch();
    const router=useRouter();
    const fet = async () => {
        const response = await fetch('http://localhost:3000/api/auth/accessToken');
        const data = await response.json();

         dispatch(addAuth(data))

    }
    const fet2 = async () => {
        if (auth) {
            const response = await fetch('http://localhost:3000/api/testament', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.access_Token}`
                },
            });
            const datas = await response.json();
           if (datas) return dispatch(addTestament(datas))

        }

    }

    useEffect(() => {
        const isUser = localStorage.getItem('isUser')
        if (isUser) {
            return fet()
        } else {
           router.push('/login')
        }

    }, []);
    useEffect(() => {


        if (auth.access_Token) {
            setLoading(false)
            return fet2()
        } else {
            return console.log('error')
        }

    },[auth.access_Token])

    if (loading){
        return <LoadingProgress/>
    }

    //query
    // useEffect(()=>{
    //     router.push({
    //         path:'/',
    //         query:{access_Token:auth.access_Token}
    //     })
    // },[auth])


    return (
        <div className='content_app'>
            <Layout>
                <Header/>
                <ContentHome/>
            </Layout>
        </div>
    )
}



export default index;


// export const getServerSideProps=async ({query})=>{
//     const token=query.access_Token
//
//  if (token){
//      const response = await fetch('http://localhost:3000/api/testament', {
//          method:'GET',
//          headers:{
//              'Content-Type': 'application/json',
//              Authorization:`Bearer ${token&&token}`
//          },
//      });
//      const data = await response.json();
//
//      console.log(data)
//      return{
//          props:{
//              data
//          }
//      }
//  }else {
//      return {
//          props:{
//              data:[]
//          }
//      }
//  }
// }
