import React from 'react';
import {TextField,} from "@mui/material";
import {FormControl} from "@mui/material";

const LoginDesign = () => {

    const styles={
        display: "flex",
       flexDirection: "column",
   alignItems: "center",
    background: "red",
    height: "300px",
    width: "50%",
        transform: 'rotate3d(11, -68, 0, -45deg)',
    }
    return (
        <div style={{display:'flex',justifyContent:'center'}}>
          <div style={styles}>
              <p>login</p>
              <FormControl sx={{ width: '25ch' }}>
                  <TextField value='owies@gmail.com' label="Standard" variant="standard"/>
                  <TextField type='password' value='owies@gmail.com' label="password" variant="standard"/>
              </FormControl>
          </div>
        </div>
    );
};

export default LoginDesign;