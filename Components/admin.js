




import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import TableContainer from "@mui/material/TableContainer";
import style from "../styles/interaction.testament.module.scss";
import custmeStyle from '../styles/admin.module.scss'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Box, Button, Container, Grid} from "@mui/material";
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


const Admin = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const {auth} = useSelector(state => state.sliceAuth)
    const [showAlert, setShowAlert] = useState(false)
    const[isValid,setIsValid]=useState({title:'',status:''})
    const[showTestament,setShowTestament]=useState(false)
    const[accessTestament,setAccessTestament]=useState('')
    const router=useRouter()
    const getUsers=async ()=>{
        setLoading(true)
        const user=await getData('user',auth.access_Token)
        if (user.err) return console.log('error')

        return setUsers(user)


    }

    const handleDeleteUser=async (id,root)=>{

        let isValidData = {};
        if (root){
            isValidData={title: 'you can not delete admin',status: 'error'}
        }else{
            const res=await deleteData('user',auth.access_Token, {id})
            if (res.err) {
                isValidData={...isValid,title: res.err,status: 'error'}
            }else {
                isValidData={...isValid,title: res.msg,status: 'success'}
                router.reload()
            }
        }


        setIsValid({ ...isValid, ...isValidData });
        setShowAlert(true);
    }
    const handleSetAdmin=async (id,)=>{

        let isValidData = {};
        if (!auth.user.root){
            isValidData={title:'just admin can be set admin',status:'error'}
        }else {

            const res=await updateData('user',{id,role:'admin'},auth.access_Token)
            if (res.err){
                isValidData={title:res.err,status:'error'}
            }else {
                isValidData={title:res.msg,status:'success'}
                router.reload()
            }

        }
        setIsValid({ ...isValid, ...isValidData });
        setShowAlert(true);
    }
    const handleSeeTestament=async (id)=>{

        //i use api vote because that is only api can access testament by query
        //i mean the api testament can access just by auth.user not by req.body or by query or params

        const getTestament=await getData(`user/vote?id=${id}`,auth.access_Token)
        if (getTestament.err){
           setShowAlert(true)
           setIsValid({title:getTestament.err,status:'error'})
        }else {
            setShowTestament(true)
            setAccessTestament(getTestament.testament||'this user do not add testament')
        }

    }
    const handleSetAsUser = async (id) => {
        let isValidData = {};
        if (!auth.user.root) {
            isValidData = {title: 'just admin can be set an admin to user', status: 'error'}
        } else {

            const res = await updateData('user', {id, role: 'user'}, auth.access_Token)
            if (res.err) {
                isValidData = {title: res.err, status: 'error'}
            } else {
                isValidData = {title: res.msg, status: 'success'}
                router.reload()
            }

        }
        setIsValid({...isValid, ...isValidData});
        setShowAlert(true);
    }

    const handleLogOut=()=>{
        localStorage.removeItem('isUser')
        Cookie.remove('refresh_token')
        router.push('/login')
    }

    useEffect(() => {

        return getUsers()
    }, [])

    let count=1;

    //if not an admin
    // if (auth.user.role !=='admin' ){
    //
    //     setShowAlert(true)
    //     return <AlertNotify showAlert={showAlert} setShowAlert={setShowAlert} title={isValid.title} status={isValid.status} />
    // }
    return (
       <Box className={custmeStyle.controller_admin} p={2}>
           <Button sx={{marginBottom:'20px'}} variant='contained' color='primary' onClick={handleLogOut}>log out</Button>
           {showAlert&&<AlertNotify showAlert={showAlert} setShowAlert={setShowAlert} title={isValid.title} status={isValid.status} />}
           {showTestament&&<ModelShowTestamentVotingUsers showTestament={showTestament} setShowTestament={setShowTestament }testament={accessTestament}/>}
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

                       {users&&users.map((row,id) => (
                           <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                               <TableCell component="th" >{count++}</TableCell>
                               <TableCell component="th" scope="row">
                                   <Grid textAlign='center' container spacing={2} alignItems='center'>

                                       <img className={styleImg.rounded_image_small} src={row.picture}/>
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