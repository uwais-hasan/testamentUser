import {createSlice} from "@reduxjs/toolkit";



const initialState={
    testamentUser:{}
}

const sliceTestament=createSlice({
    name:'sliceTestament',
    initialState,
    reducers:{
        addTestament:(state,action)=>{
            state.testamentUser=action.payload;
        },
        addText:(state,action)=>{
            state.testamentUser.testament=action.payload
        }

    },
    extraReducers:{},
})


export default sliceTestament.reducer

export const{addTestament,addText}=sliceTestament.actions