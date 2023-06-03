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
    height: '600px',

    backgroundImage: 'url(./bg.jpeg)',
}
import CreateIcon from '@mui/icons-material/Create';
import Cookie from "js-cookie";
import FaceBookLogin from "../Components/Login/FaceBookLogin";
import Link from 'next/link'
import AlertNotify from "../Components/Model/AlertNotify";

import {useRouter} from "next/router";


const Register = () => {

    const [data, setData] = useState({firstName: '', lastName: '', email: '', password: '', re_password: ''})
    const [isValid, setIsValid] = useState({status: '', title: ''})
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async () => {



        const res = await postData('auth/register', {...data, name: data.firstName + " " + data.lastName})
         setShowAlert(true)
        if (res.err) return setIsValid({...isValid, status: 'error', title: res.err})
        setIsValid({...isValid, status: 'success', title: res.msg})

        Cookie.set('refresh_token', res.refresh_Token, {
            path: "api/auth/accessToken",
            expires: 7,

        })
        localStorage.setItem('isUser', true)

        router.push('/')

    }


    return (
        <div className={style.content_login} style={styleContent}>
            {showAlert&& <AlertNotify status={isValid.status} title={isValid.title} showAlert={showAlert} setShowAlert={setShowAlert}/>}

            <Container>
                <Grid container columns={{md: 12, xs: 12}} alignItems='center'>

                    <Grid item md={6} xs={4}>
                        <AppGlimpse/>
                    </Grid>
                    <Grid item md={2} xs={0}/>
                    <Grid item container md={4} xs={8} className={style.style_login} flexDirection='column'>

                        <h1 className={style.style_title}>Register </h1>
                        <TextField label='First Name'
                                   size="large"
                                   style={{margin: '10px 0', padding: '5px 0', fontWeight: 'bold'}}
                                   value={data.firstName}
                                   type='text'
                                   placeholder='your first name'
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <CreateIcon sx={{margin: '10px'}}/>
                                           </InputAdornment>
                                       ),
                                   }}

                                   variant="standard"
                                   onChange={(e) => setData({...data, firstName: e.target.value})}
                        />
                        <TextField label='Last Name'
                                   size="large"
                                   style={{margin: '10px 0', padding: '5px 0', fontWeight: 'bold'}}
                                   value={data.lastName}
                                   type='text'
                                   placeholder='your last name'
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <CreateIcon sx={{margin: '10px'}}/>
                                           </InputAdornment>
                                       ),
                                   }}

                                   variant="standard"
                                   onChange={(e) => setData({...data, lastName: e.target.value})}
                        />
                        <TextField label='email'
                                   size="large"
                                   style={{margin: '10px 0', padding: '5px 0', fontWeight: 'bold'}}
                                   value={data.email}
                                   type='email'
                                   placeholder='your name@example.com'
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <MailOutlineIcon sx={{margin: '10px'}}/>
                                           </InputAdornment>
                                       ),
                                   }}

                                   variant="standard"
                                   onChange={(e) => setData({...data, email: e.target.value})}
                        />

                        <TextField
                            label='password'
                            style={{margin: '10px 0', padding: '5px 0', fontWeight: 'bold'}}
                            value={data.password}
                            placeholder='########'
                            type='password'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            onChange={(e) => setData({...data, password: e.target.value})}

                        />
                        <TextField label='re_password'
                                   size="large"
                                   style={{margin: '10px 0', padding: '5px 0', fontWeight: 'bold'}}
                                   value={data.re_password}
                                   type='password'
                                   placeholder='########'
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <VpnKeyIcon sx={{margin: '10px'}}/>
                                           </InputAdornment>
                                       ),
                                   }}

                                   variant="standard"
                                   onChange={(e) => setData({...data, re_password: e.target.value})}
                        />
                        <Link href='/login' className={style.register}>Login</Link>
                        <Button sx={{marginTop: '20px'}} onClick={handleSubmit} variant='contained'
                                color='primary'>submit</Button>
                        <FaceBookLogin/>

                    </Grid>

                </Grid>
            </Container>

        </div>
    );
};

export default Register;