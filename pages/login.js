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
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {useDispatch, useSelector} from "react-redux";
import {showNotify} from "../Store/Slicess/SliceNotify";
const styleContent={
    width:'100%',
    backgroundImage: 'url(./bg_register.jpeg)',
}

const Login = () => {
    const router = useRouter();
    const dispatch=useDispatch()
    const{Alert}=useSelector(state=>state.sliceNotify)

    const {t: translate} = useTranslation('register');
    const [data, setData] = useState({email: '', password: ''})

    const[loading,setLoading]=useState(false)


    const handleSubmit= async ()=>{

        let isValid={}
        setLoading(true)
        const res=await postData('auth/login',data)

        if (res.err) {
            if (res.err==='please fill all field')  isValid={status:'error',title:translate('please_fill_all_field')}
            if (res.err==='this email did not exist')  isValid={isValid,status:'error',title:translate('this_email_did_not_exist')}
            if (res.err==='password wrong')  isValid={isValid,status:'error',title:translate('password_wrong')}
            if (res.err==='error server')  isValid={isValid,status:'error',title:translate('error_server')}


        }
        else {
            localStorage.setItem('isUser', true)
            Cookie.set('refresh_token',res.refresh_Token,{
                path:"api/auth/accessToken",
                expires:7,

            })
            isValid={status:'success',title:translate('success_login')}
            router.push('/')
        }
        setLoading(false)
        dispatch(showNotify({showAlert:true,...isValid}))

    }






    return (
        <div className={style.content_login} style={styleContent}>
            {Alert.showAlert&&<AlertNotify status={Alert.status}  title={Alert.title} showAlert={Alert.showAlert} />}
            <Container>
               <Grid container direction={{md:'row',xs:'column'}} columns={{md: 12, xs: 12}} alignItems='start'>

                   <Grid flexGrow={1} item md={7} xs={12} >
                       <AppGlimpse/>
                   </Grid>
                   <Grid item md={1} xs={0}/>
                   <Grid gap={2} item container  md={4} xs={12} direction='column' className={style.style_login} >

                              <h1 className={style.style_title}>{translate('login')} </h1>
                           <TextField  label={translate('email')}
                                       size="large"
                                       value={data.email}
                                       type='email'
                                       placeholder='example.com'
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <MailOutlineIcon  />
                                               </InputAdornment>
                                           ),
                                       }}

                                       id="filled-textarea"
                                       variant="filled"
                                       onChange={(e)=>setData({...data,email: e.target.value})}
                           />
                           <TextField
                               label={translate('password')}

                               value={data.password}
                               type='password'
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <VpnKeyIcon />
                                       </InputAdornment>
                                   ),
                               }}
                               placeholder='**********'
                               id="filled-textarea"
                               variant="filled"
                               onChange={(e)=>setData({...data,password: e.target.value})}

                           />
                       <Link  href='/register' >
                           <a className={style.register}>{translate('register')}</a>
                       </Link>

                           <Button sx={{marginTop:'10px'}} onClick={handleSubmit} variant='contained' color='primary'>
                               {loading?translate('loading'):translate('submit')}
                           </Button>

                       {/*<FaceBookLogin/>*/}
                   </Grid>
               </Grid>
            </Container>

        </div>
    );
};

export default Login;


export  async function  getStaticProps({locale}){

    return{
        props:{
            ...(await serverSideTranslations(locale,['register']))
        }
    }
}






