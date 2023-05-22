import React from 'react';
import {Button} from "@mui/material";
import axios from "axios";

const Params = () => {

    const handleClickGet=async ()=>{

        const {data}=await axios({
            method:'GET',
            url:'http://localhost:3000/api/testament',
            params:{id: '123', name: '342',}
        })
        console.log(data)
    }

    const handleClickPost=async ()=>{

        const {data}=await axios({
            method:'POST',
            url:'http://localhost:3000/api/testament',
            data:{dataOne:'one data',dataTwo:"two data"},
            params:{id: 'id params', name: 'name params',}
        })
        console.log(data)
    }

    return (
        <div>

            <Button onClick={handleClickGet}>get</Button>
            <Button onClick={handleClickPost}>post</Button>
        </div>
    );
};

export default Params;