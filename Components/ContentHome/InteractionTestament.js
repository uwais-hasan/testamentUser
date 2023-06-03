import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import styleImg from '../../styles/Images.module.scss'
import style from '../../styles/interaction.testament.module.scss'
import {Grid} from "@mui/material";
import {useSelector} from "react-redux";
import moment from 'moment';
const InteractionTestament = () => {



    let count=1;

    const {testamentUser}=useSelector(state=>state.sliceTestament)

    const stateVoting=testamentUser.typeTestament==='special Friends'?testamentUser.voteSpecialFriends:testamentUser.voteUsers;


    return (
        <TableContainer className={style.section_interaction} component={Paper}  sx={{overflow:'scroll',maxHeight:500}} >



            <Table sx={{minWidth:500,overflow:'scroll'}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Date</TableCell>

                    </TableRow>
                </TableHead>

                    {testamentUser.typeTestament==='public'?<p className={style.no_interaction} >public testament_no interaction</p>:
                        <TableBody>

                           {stateVoting&&stateVoting.map((row,id) => (
                               <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                   <TableCell component="th" >{count++}</TableCell>
                                   <TableCell component="th" scope="row"><Grid container spacing={2} alignItems='center'>

                                       <img className={styleImg.rounded_image_small} src={row.picture}/>
                                       {row.name}
                                   </Grid></TableCell>
                                   <TableCell align="right">{moment( row.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</TableCell>


                               </TableRow>
                           ))}


                        </TableBody>
                    }

            </Table>
        </TableContainer>
    );
};

export default InteractionTestament;