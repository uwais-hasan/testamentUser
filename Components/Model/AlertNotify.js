import React from 'react';
import {Alert, Snackbar} from "@mui/material";
import {useDispatch} from "react-redux";
import {showNotify} from "../../Store/Slicess/SliceNotify";

//nav you are will begin
// وصلت لعند الناف عم بتحذف طريقة الشغل القديمة بخصوص الاليرت وعرض الخطا وعم تستخدم ريدكس لاتنسى انك تشوف طريقة العمل الصحيحة في كومبونانت HeaderInfoUser
const AlertNotify = ({title,status,showAlert}) => {

    const dispatch=useDispatch()

    const handleClose = () => {
        dispatch(showNotify({showAlert:false}))
    };

    return (

        <Snackbar sx={{zIndex:'1000'}} open={showAlert} autoHideDuration={4000} onClose={handleClose}  anchorOrigin={{vertical: 'top', horizontal: 'right', }}>
            <Alert onClose={handleClose} severity={status||''} sx={{ width: '100%' }} >
                {title}
            </Alert>
        </Snackbar>
    );
};

export default AlertNotify;