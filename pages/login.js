import React, {useState} from 'react';

import style from '../styles/login.module.scss'
import AppGlimpse from "../Components/AppGlimpse";
import { Button, Container, Grid, TextField} from "@mui/material";

import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FaceBookLogin from "../Components/Login/FaceBookLogin";
import {postData} from "../Utils/FetchData";

import Cookie from 'js-cookie'

import {useRouter} from "next/router";
import AlertNotify from "../Components/Model/AlertNotify";
import Link from "next/link";

const styleContent={
    width:'100%',
    height:'600px',

    backgroundImage: 'url(./bg.jpeg)',
}






const Login = () => {

    const[data,setData]=useState({email:'',password:''})
    const[isValid,setIsValid]=useState({status:'',title:''})
    const [showAlert, setShowAlert] = useState(false);
    const router=useRouter()
    const handleSubmit= async ()=>{

        const res=await postData('auth/login',data)
        setShowAlert(true)
        if (res.err) return setIsValid({...isValid,status:'error',title:res.err})
        localStorage.setItem('isUser', true)

        Cookie.set('refresh_token',res.refresh_Token,{
            path:"api/auth/accessToken",
            expires:7,

        })
        setIsValid({...isValid,status:'success',title:res.msg})
        router.push('/')

    }




    return (
        <div className={style.content_login} style={styleContent}>
            {showAlert&&<AlertNotify status={isValid.status}  title={isValid.title} showAlert={showAlert} setShowAlert={setShowAlert} />}
            <Container>
               <Grid container columns={{md:12,xs:12}} alignItems='center'>

                   <Grid item md={6} xs={4} >
                       <AppGlimpse/>
                   </Grid>
                   <Grid item md={2} xs={0}/>
                   <Grid container item md={4} xs={8} direction='column' className={style.style_login} >

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
                       <Link className={style.register} href='/register'>Register</Link>
                           <Button sx={{marginTop:'10px'}} onClick={handleSubmit} variant='contained' color='primary'>submit</Button>

                       <FaceBookLogin/>
                   </Grid>

               </Grid>
            </Container>

        </div>
    );
};

export default Login;




