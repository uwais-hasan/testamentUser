import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ResTestamentData} from "../../data";

import styleImg from '../../styles/Images.module.scss'
import {Grid} from "@mui/material";
const InteractionTestament = () => {

    const withData=ResTestamentData.likesUsers;

    let count=1;


    return (
        <TableContainer component={Paper}  sx={{overflow:'scroll',maxHeight:500}} >



            <Table sx={{minWidth:500,overflow:'scroll'}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Date</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {withData&&withData.map((row) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" >{count++}</TableCell>
                            <TableCell component="th" scope="row"><Grid container spacing={2} alignItems='center'>

                                <img className={styleImg.rounded_image_small} src={row.imgUser}/>
                                {row.name}
                            </Grid></TableCell>
                            <TableCell align="right">{row.date}</TableCell>


                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default InteractionTestament;