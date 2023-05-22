import {configureStore} from "@reduxjs/toolkit";

import sliceAuth from './Slicess/SliceAuth'
import sliceTestament from './Slicess/SliceTestament'
import {createWrapper} from "next-redux-wrapper";
const store=configureStore({
    reducer:{
        sliceTestament,sliceAuth
    },devTools:true
})


const makeStore=()=>store


export  const wrapper=createWrapper(makeStore)


