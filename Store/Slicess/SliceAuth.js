


import {createSlice} from "@reduxjs/toolkit";

import { HYDRATE } from "next-redux-wrapper";

const initialState={
    auth:{}
}

const sliceAuth=createSlice({
    name:'sliceAuth',
    initialState,
    reducers:{
        addAuth:(state,action)=>{
            state.auth=action.payload;


        }
    },
    [HYDRATE]: (state, action) => {
        return {
            ...state,
            ...action.payload,
        };
    },
})


export default sliceAuth.reducer

export const{addAuth}=sliceAuth.actions