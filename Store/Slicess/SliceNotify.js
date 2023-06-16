import {createSlice} from "@reduxjs/toolkit";





const initialState={
    Alert: {
        showAlert: false,
        status: '',
        title: ''
    }
}

const SliceNotify=createSlice({
    name:'SliceNotify',
    initialState,
    reducers:{
        showNotify:(state,action)=>{
            state.Alert=action.payload;
        }
    }
})


export default SliceNotify.reducer;

export const {showNotify}=SliceNotify.actions