import React, {useEffect, useState} from 'react';

import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import Cookie from "js-cookie";
import {postData} from "../../Utils/FetchData";
const FaceBookLogin = () => {


const[da,setDa]=useState('')

    const[dataFace,setDataFace]=useState([])




    const responseFacebook = async (response) => {
        const {accessToken, id} = response

        const res=await postData('auth/facebookLogin',{accessToken,id})

        if (res.err) return console.log(res.err)

        console.log(res)

        Cookie.set('refresh_token',res.refresh_Token,{
            path:"api/auth/accessToken",
            expires:30,

        })



    }




    const getData=async (id)=>{

        const {data} = await axios({
            method: 'GET',
            url: `http://localhost:3000/api/login?id=${id}`
        })

        setDa(data)
    }









    return (
        <div>
           <div>
               <FacebookLogin
                   appId="150251301350514"
                   // autoLoad={true}
                   fields="name,email,picture"
                   callback={responseFacebook}
                   cssClass="my-facebook-button-class"
                   icon="fa-facebook"
               />
           </div>
            <div>
                {da&&<div>

                    <img src={da.picture}/>
                    <p>{da.name}</p>
                    <p>{da.email}</p>
                </div>}
            </div>
        </div>
    );
};

export default FaceBookLogin;