import React from 'react';

import styles from '../styles/Header.module.scss'

import styleImage from '../styles/Images.module.scss'
import {TextField} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';





const Header = () => {
    return (
        <div className={styles.content_header}>

            <img className={styleImage.image_header} src='./BG.jpeg'/>

        </div>
    );
};

export default Header;