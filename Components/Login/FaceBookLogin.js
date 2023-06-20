import React  from 'react';

import FacebookLogin from 'react-facebook-login';
import style from '../../styles/facebook.module.scss'
import Cookie from "js-cookie";
import {postData} from "../../Utils/FetchData";
import {useRouter} from "next/router";

const FaceBookLogin = () => {
const router=useRouter()
    const responseFacebook = async (response) => {
        const {accessToken, id} = response
        const res=await postData('auth/facebookLogin',{accessToken,id})

        if (res.err) {
            return console.log(res.err)
        }

       else {
            localStorage.setItem('isUser', true)
            Cookie.set('refresh_token', res.refresh_Token, {
                path: "api/auth/accessToken",
                expires: 7,

            })
          return   router.push('/')
        }
    }


    return (
               <FacebookLogin
                   cssClass={style.style}
                   appId="150251301350514"
                   autoLoad={true}
                   fields="name,email,picture"
                   callback={responseFacebook}


               />



    );
};

export default FaceBookLogin;