




import React, { useState} from 'react';
import {useDispatch, useSelector} from "react-redux";


import style from "../styles/interaction.testament.module.scss";
import custmeStyle from '../styles/admin.module.scss'

import {Box, Button, Grid,Table, TableHead, TableRow, TableCell, TableBody,TableContainer ,Paper} from "@mui/material";
import styleImg from "../styles/Images.module.scss";
import moment from "moment";
import CheckIcon from '@mui/icons-material/Check';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';
import {deleteData, getData, updateData} from "../Utils/FetchData";
import AlertNotify from "./Model/AlertNotify";
import {useRouter} from "next/router";
import ModelShowTestamentVotingUsers from "../Components/Model/modelShowTestamentVotingUsers";
import Cookie from "js-cookie";
import {showNotify} from "../Store/Slicess/SliceNotify";
import {useTranslation} from "next-i18next";
import LoadingProgress from "./LoadingProgress";


const Admin = ({users}) => {


    const dispatch=useDispatch()
    const router=useRouter()
    const {auth} = useSelector(state => state.sliceAuth)
    const{Alert}=useSelector(state=>state.sliceNotify)

    const{t:translate}=useTranslation('index')
    const [loading, setLoading] = useState(false)
    const[showTestament,setShowTestament]=useState(false)
    const[accessTestament,setAccessTestament]=useState('')
    let count=1;


    const handleDeleteUser=async (id,root)=>{


        let isValidData = {};
        if (root){
             isValidData={title: translate('error_cannot_delete_admin'),status: 'error'}
        }else{
            const res=await deleteData('user',auth.access_Token, {id})
            if (res.err) {
                isValidData={title:translate('error_server'),status: 'error'}
            }else {
                isValidData={title: translate('success_delete_admin'),status: 'success'}
                router.reload()
            }
        }

        dispatch(showNotify({showAlert:true,...isValidData}))

    }
    const handleSetAdmin=async (id,)=>{

        let isValidData = {};
        if (!auth.user.root){
            isValidData={title:translate('error_set_admin'),status:'error'}
        }else {

            const res=await updateData('user',{id,role:'admin'},auth.access_Token)
            if (res.err){
                isValidData={title:translate('error_server'),status:'error'}
            }else {
                isValidData={title:translate('success_set_admin'),status:'success'}
                router.reload()
            }

        }

        dispatch(showNotify({showAlert:true,...isValidData}))

    }
    const handleSeeTestament=async (id)=>{
        //I use api vote because that is only api can access testament by query
        //i mean the api testament can access just by auth.user not by req.body or by query or params
        setLoading(true)


        let isValidData={}

        const getTestament=await getData(`user/vote?id=${id}`,auth.access_Token)
        if (getTestament.err){

            isValidData={title:translate('error_server'),status:'error'}
        }else {
            setShowTestament(true)
            setAccessTestament(getTestament.testament||translate('user_have_not_testament'))
        }

        setLoading(false)
        dispatch(showNotify({showAlert:true,...isValidData}))


    }
    const handleSetAsUser = async (id) => {
        let isValidData = {};
        if (!auth.user.root) {
            isValidData = {title: translate('error_set_user'), status: 'error'}
        } else {

            const res = await updateData('user', {id, role: 'user'}, auth.access_Token)
            if (res.err) {
                isValidData = {title: translate('error_server'), status: 'error'}
            } else {
                isValidData = {title: translate('success_set_user'), status: 'success'}
                router.reload()
            }

        }
        dispatch(showNotify({showAlert:true,...isValidData}))


    }
    const handleLogOut=()=>{
        localStorage.removeItem('isUser')
        Cookie.remove('refresh_token')
       return  router.push('/login')
    }








    if (loading) {
        return <LoadingProgress/>
    }
    if (auth?.user?.role ==='user' ){
        localStorage.removeItem('isUser')
        Cookie.remove('refresh_token')
        router.reload()

    }

    return (
       <Box className={custmeStyle.controller_admin} p={2}>

           {Alert.showAlert&&<AlertNotify status={Alert.status}  title={Alert.title} showAlert={Alert.showAlert} />}

           {showTestament&&<ModelShowTestamentVotingUsers showTestament={showTestament} setShowTestament={setShowTestament} testament={accessTestament}/>}
           <TableContainer className={style.section_interaction} component={Paper}  sx={{overflowY:'auto',maxHeight:700}} >

               <Table  aria-label="simple table">
                   <TableHead>
                       <TableRow>
                           <TableCell >#</TableCell>
                           <TableCell>Name</TableCell>
                           <TableCell>email</TableCell>
                           <TableCell>role</TableCell>
                           <TableCell>Actions</TableCell>
                           <TableCell align="right">Date</TableCell>

                       </TableRow>
                   </TableHead>

                   <TableBody>

                       {users&&users.map((row) => (
                           <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                               <TableCell component="th" >{count++}</TableCell>
                               <TableCell component="th" scope="row">
                                   <Grid textAlign='center' container spacing={2} alignItems='center'>

                                       <img className={styleImg.rounded_image_small} src={row.picture} loading='lazy' alt={row.name}/>
                                       {row.name}
                                   </Grid>
                               </TableCell>
                               <TableCell component="th" >{row.email}</TableCell>
                               <TableCell component="th"  ><Grid container alignItems='center' gap={2}>{row.role}{row.root&&row.role==='admin'?<VerifiedUserIcon/>:row.role==='admin'?<CheckIcon/>:<PersonIcon/>}</Grid></TableCell>
                               <TableCell component="th" >
                                   <div className={custmeStyle.flex}>
                                       <Button onClick={() => handleDeleteUser(row._id, row.root)} variant='contained'
                                               color='error'>Delete</Button>
                                       <Button onClick={() => handleSetAdmin(row._id)} variant='contained'
                                               color='success'>Set as Admin</Button>
                                       {row.role === 'admin' && !row.root &&
                                       <Button onClick={() => handleSetAsUser(row._id, row.root)} variant='contained'
                                               color='primary'>Set as user</Button>}
                                       <Button onClick={() => handleSeeTestament(row._id)} variant='contained'
                                               color='warning'>Testament User</Button>
                                   </div>
                               </TableCell>
                               <TableCell component="th" align="right">{moment( row.createdAt).format("MMMM Do YYYY")}</TableCell>


                           </TableRow>
                       ))}


                   </TableBody>


               </Table>

           </TableContainer>
       </Box>
    );
};

export default Admin;