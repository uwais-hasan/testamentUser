import {createSlice} from "@reduxjs/toolkit";



const initialState={
    dataTestament:[]
}

const sliceTestament=createSlice({
    name:'sliceTestament',
    initialState,
    reducers:{
        addTestament:(state,action)=>{}
    },
    extraReducers:{},
})


export default sliceTestament.reducer

const{addTestament}=sliceTestament.actions