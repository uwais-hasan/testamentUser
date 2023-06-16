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
import {useTranslation} from "next-i18next";
const InteractionTestament = () => {




const{t:translate}=useTranslation('index')
    let count=1;

    const {testamentUser}=useSelector(state=>state.sliceTestament)

    const stateVoting=testamentUser.typeTestament==='special Friends'?testamentUser.voteSpecialFriends:testamentUser.voteUsers;


    return (
        <>
            {testamentUser.typeTestament==='public' ||!testamentUser.voteSpecialFriends  || !testamentUser.voteUsers ?<p className={style.no_interaction} > {translate('no_interactions')}</p>:
            <TableContainer className={style.section_interaction} component={Paper} sx={{maxHeight:490,overflowY:'scroll'}} >



                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Date</TableCell>
                            {/*<TableCell>{translate('Name')}</TableCell>*/}
                            {/*<TableCell align="right">{translate('Date')}</TableCell>*/}
                        </TableRow>
                    </TableHead>


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
                </Table>
            </TableContainer>
            }
        </>

    );
};

export default InteractionTestament;