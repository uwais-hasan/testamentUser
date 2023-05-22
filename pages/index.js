
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
import {useRouter} from "next/router";


export const index=(data)=> {

    const {auth}=useSelector(state=>state.sliceAuth)


    const dispatch=useDispatch();
    const router=useRouter();
    const fet = async () => {
        const response = await fetch('http://localhost:3000/api/auth/accessToken');
        const data = await response.json();
        return dispatch(addAuth(data))

    }
    // const fet2 = async () => {
    //     const response = await fetch('http://localhost:3000/api/testament', {
    //         method:'GET',
    //         headers:{
    //             'Content-Type': 'application/json',
    //             Authorization:`${auth.access_Token}`
    //         },
    //     });
    //     const data = await response.json();
    // }

    useEffect(() => {

        const isUser = localStorage.getItem('isUser')

        if (isUser) {
            return fet()

        } else {
            return console.log('error')
        }


    }, []);






console.log(auth)
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
//     const response = await fetch('http://localhost:3000/api/testament', {
//         method:'GET',
//         headers:{
//             'Content-Type': 'application/json',
//             Authorization:`${token&&token}`
//         },
//     });
//     const data = await response.json();
//     return{
//         props:{
//             data:'sssss'
//         }
//     }
// }
