








import React, {useEffect, useState} from 'react';
import AboutUser from "../Components/ContentPageVote/AboutUser";
import UserVotingInteraction from "../Components/ContentPageVote/UserVotingInteraction";

import style from '../styles/content_page_vote.module.scss'
import {addAuth} from "../Store/Slicess/SliceAuth";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import ModelReceiveSpecialFriends from "../Components/Model/modelReceiveSpecialFriends";
import ModelShowTestamentVotingUsers from "../Components/Model/modelShowTestamentVotingUsers";
import {isAuthAccessToken} from "../Utils/PublicFun";
import LoadingProgress from "../Components/LoadingProgress";
import {useRouter} from "next/router";

const voting = ({data}) => {



    const[showBtnTestament,setShowBtnTestament]=useState(false)
    const[showTestament,setShowTestament]=useState(false)
    const[openReceive, setOpenReceive]=useState(false)
    const dispatch=useDispatch();


    if (Object.keys(data).length === 0) {
        return <h1>no testament</h1>
    }


    useEffect(() => {
        const isUser = localStorage.getItem('isUser')
        if (isUser) {
            return isAuthAccessToken(dispatch)
        }

    }, []);
    useEffect(() => {
        if (data.typeTestament === 'votes users') {

            if (data.countLikeUsers === data.voteUsers.length) {
                setShowBtnTestament(true)
            }

        } else if (data.typeTestament === 'special Friends') {
            if (data.selectSpecialFriend.length === data.voteSpecialFriends.length) {
                setShowBtnTestament(true)
            }
        } else if (data.typeTestament === 'public') {
            setShowBtnTestament(true)
        }
    }, [])




    const handleShowTestamentUser=()=>{
        const type=data.typeTestament;
        if (type==='special Friends'){
            setOpenReceive(true)
        }else {
           setShowTestament(true)
        }
    }

    if (openReceive){
        return <ModelReceiveSpecialFriends showTestament={showTestament} setShowTestament={setShowTestament} openReceive={openReceive} setOpenReceive={setOpenReceive} data={data}/>
    }

    if (showTestament){
        return <ModelShowTestamentVotingUsers showTestament={showTestament} setShowTestament={setShowTestament}/>
    }




    return (
        <div className={style.content_page_vote}>
                <div  className={style.see_testament}>
                    {showBtnTestament&& <Button onClick={handleShowTestamentUser} variant='contained' color='error'>click here to see testament</Button>}

                </div>
                <AboutUser data={data} />
                <UserVotingInteraction data={data}/>


        </div>
    );
};

export default voting;



export const getServerSideProps=async ({query})=>{

    const res=await fetch(`http://localhost:3000/api/user/vote?name=${decodeURIComponent(query.name)}&id=${query.id}`)
    const data=await res.json()

    return{
        props:{
            data
        }
    }
}