








import React from 'react';
import AboutUser from "../Components/ContentPageVote/AboutUser";
import UserVotingInteraction from "../Components/ContentPageVote/UserVotingInteraction";

import style from '../styles/content_page_vote.module.scss'

import useAuth from "../Hooks/useAuth";
const test = ({data}) => {
    const isAuth=useAuth()
    console.log(data)

    return (
        <div className={style.content_page_vote}>
            <AboutUser/>
            <UserVotingInteraction/>
        </div>
    );
};

export default test;



export const getServerSideProps=async ({query})=>{

    const res=await fetch(`http://localhost:3000/api/user/testament?firstName=${query.firstName}&randomString=${query.randomString}`)
    const data=await res.json()

    return{
        props:{
            data
        }
    }
}