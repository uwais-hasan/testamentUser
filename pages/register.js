import React, {useState} from 'react';
import style from '../styles/login.module.scss'
import AppGlimpse from "../Components/AppGlimpse";
import {Button, Container, Grid, TextField} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {postData} from "../Utils/FetchData";
const styleContent = {
    width: '100%',


    backgroundImage: 'url(./bg_register.jpeg)',
}
import CreateIcon from '@mui/icons-material/Create';
import Cookie from "js-cookie";
import FaceBookLogin from "../Components/Login/FaceBookLogin";
import Link from 'next/link'
import AlertNotify from "../Components/Model/AlertNotify";

import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {useDispatch, useSelector} from "react-redux";
import {showNotify} from "../Store/Slicess/SliceNotify";


const Register = () => {

    const router = useRouter();
    const dispatch=useDispatch()

    const{Alert}=useSelector(state=>state.sliceNotify)
    const{t:translate}=useTranslation('register')

    const [data, setData] = useState({firstName: '', lastName: '', email: '', password: '', re_password: ''})

    const[loading,setLoading]=useState(false)

    const handleSubmit = async () => {
        let isValid={}

        setLoading(true)
        const res = await postData('auth/register', {...data, name: data.firstName + " " + data.lastName})
        if (res.err) {
            if (res.err === 'this email already exist')  isValid={ status: 'error', title: translate('this_email_already_exist')}
            else if (res.err === 'please add all field')  isValid={ status: 'error', title: translate('please_fill_all_field')}
            else if (res.err === 'password must be at least 6 characters')  isValid={ status: 'error', title: translate('password_must_be_at_least_6_characters')}
            else if (res.err === 'confirm password did not match')  isValid={ status: 'error', title: translate('confirm_password_did_not_match')}
            else if (res.err === 'Invalid emails')  isValid={ status: 'error', title: translate('error_email')}

            else {
              isValid={ status: 'error', title: translate('error_server')}
            }

        }
        else {

            localStorage.setItem('isUser', true)
            Cookie.set('refresh_token', res.refresh_Token, {
                path: "api/auth/accessToken",
                expires: 7,

            })
            isValid={status:'success',title:translate('success_register')}

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

                    <Grid  item md={7} xs={12}>
                        <AppGlimpse/>
                    </Grid>
                    <Grid  item md={1} xs={0}/>


                    <Grid gap={2} item container  md={4} xs={12} className={style.style_login} flexDirection='column' alignItems='center' >
                        <Grid item>
                            <h1 className={style.style_title}>{translate('register')} </h1>
                        </Grid>
                        <Grid item container gap={2} justifyContent='center'>


                            <TextField label={translate('firstName')}
                                       sx={{width:'45%'}}
                                       value={data.firstName}
                                       type='text'
                                       placeholder={translate('firstName')}
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <CreateIcon />
                                               </InputAdornment>
                                           ),
                                       }}

                                       id="filled-textarea"
                                       variant="filled"
                                       onChange={(e) => setData({...data, firstName: e.target.value})}
                            />
                                 <TextField label={translate('lastName')}

                                       sx={{width:'45%'}}
                                       value={data.lastName}
                                       type='text'
                                       placeholder={translate('lastName')}
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <CreateIcon />
                                               </InputAdornment>
                                           ),
                                       }}

                                       id="filled-textarea"
                                       variant="filled"
                                       onChange={(e) => setData({...data, lastName: e.target.value})}
                            />
                            <TextField label={translate('email')}
                                       size="large"
                                       sx={{width:'95%'}}
                                       value={data.email}
                                       type='email'
                                       placeholder=' name@example.com'
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <MailOutlineIcon />
                                               </InputAdornment>
                                           ),
                                       }}

                                       id="filled-textarea"
                                       variant="filled"
                                       onChange={(e) => setData({...data, email: e.target.value})}
                            />

                            <TextField
                                label={translate('password')}
                                sx={{width:'95%'}}
                                value={data.password}

                                type='password'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder='**********'
                                id="filled-textarea"
                                variant="filled"
                                onChange={(e) => setData({...data, password: e.target.value})}

                            />
                            <TextField label={translate('re_password')}

                                       sx={{width:'95%'}}
                                       value={data.re_password}
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
                                       onChange={(e) => setData({...data, re_password: e.target.value})}
                            />


                        </Grid>
                        <Grid item container direction='column' >
                            <Link href='/login' >
                                <a className={style.register}>{translate('login')}</a>
                            </Link>
                            <Button sx={{marginTop: '20px'}} onClick={handleSubmit} variant='contained'
                                    color='primary'> {loading?translate('loading'):translate('submit')}</Button>
                            {/*<FaceBookLogin/>*/}
                        </Grid>
                    </Grid>

                </Grid>
            </Container>

        </div>
    );
};

export default Register;

export  async function  getStaticProps({locale}){

    return{
        props:{
            ...(await serverSideTranslations(locale,['register']))
        }
    }
}