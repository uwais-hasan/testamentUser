import React from 'react';
import AboutUser from "../Components/ContentPageVote/AboutUser";
import UserVotingInteraction from "../Components/ContentPageVote/UserVotingInteraction";

import style from '../styles/content_page_vote.module.scss'

const vote = ({data}) => {

    console.log(data)
    return (
        <div className={style.content_page_vote}>
            <AboutUser/>
            <UserVotingInteraction/>
        </div>
    );
};

    export default vote;


// this page for testing use params and the page testament i use query
    export const getServerSideProps=async ({params})=>{

        const res=await fetch(`http://localhost:3000/api/user/${params.id}`)
        const data=await res.json()

        return{
            props:{
                data
            }
        }
    }