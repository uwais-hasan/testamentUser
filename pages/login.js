import React, {useState} from 'react';

import style from '../styles/login.module.scss'
import AppGlimpse from "../Components/AppGlimpse";
import {Box, Button, Container, Grid, TextField} from "@mui/material";

import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FaceBookLogin from "../Components/Login/FaceBookLogin";
import {postData} from "../Utils/FetchData";

import Cookie from 'js-cookie'

import {useRouter} from "next/router";
const styleContent={
    width:'100%',
    height:'600px',

    backgroundImage: 'url(./bg.jpeg)',
}






const Login = () => {




    const[data,setData]=useState({email:'',password:''})

    const router=useRouter()
    const handleSubmit= async ()=>{
        console.log(data)
        const res=await postData('auth/login',data)
        if (res.err) return console.log({err:res.err})
        console.log(res)


        Cookie.set('refresh_token',res.refresh_Token,{
            path:"api/auth/accessToken",
            expires:7,

        })
        localStorage.setItem('isUser', true)


        router.push('/')
    }
    return (
        <div className={style.content_login} style={styleContent}>

            <Container>
               <Grid container columns={{md:12,xs:12}} alignItems='center'>

                   <Grid item md={6} xs={4} >
                       <AppGlimpse/>
                   </Grid>
                   <Grid item md={2} xs={0}/>
                   <Grid container md={4} xs={8} direction='column' className={style.style_login} >

                              <h1 className={style.style_title}>Login </h1>
                           <TextField  label='email'
                                       size="large"
                                       style={{margin:'10px 0',padding:'10px 0',fontWeight:'bold'}}
                                       value={data.email}
                                       type='email'
                                       placeholder='example.com'
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <MailOutlineIcon sx={{margin:'10px'}} />
                                               </InputAdornment>
                                           ),
                                       }}

                                       variant="standard"
                                       onChange={(e)=>setData({...data,email: e.target.value})}
                           />
                           <TextField
                               label='password'
                               style={{margin:'10px 0',padding:'10px 0',fontWeight:'bold'}}
                               value={data.password}
                               type='password'
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <VpnKeyIcon />
                                       </InputAdornment>
                                   ),
                               }}
                               variant="standard"
                               onChange={(e)=>setData({...data,password: e.target.value})}

                           />
                       <span className={style.register}>Register</span>
                       <span className={style.forget}>forget password</span>

                           <Button onClick={handleSubmit} variant='contained' color='primary'>submit</Button>

                       <FaceBookLogin/>
                   </Grid>

               </Grid>
            </Container>

        </div>
    );
};

export default Login;




