

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import React, {useState} from "react";

import styles from '../../styles/Nav.module.scss'
import Link from "next/link";
import ModelSetting from "../Model/modelSetting";
import {useRouter} from "next/router";
import Cookie from "js-cookie";




const pages = ['Testament', 'Contact', 'Policy','how to use'];
const settings = [, 'Setting', 'Dashboard','Logout'];
const Nav=()=>{

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const [open, setOpen] = React.useState(false);
    const router=useRouter()
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

        const handleSetting=(type)=>{

            if (type==='Setting'){
                setOpen(true)
            }
            else if (type==='Logout'){
                Cookie.remove('refresh_token')
                localStorage.removeItem('isUser')
                router.push('/login')
            }
        }

        if (open){
            return <ModelSetting setOpen={setOpen } open={open}/>
        }

    return (
     <Box className={styles.content_nav}>
         <AppBar className={styles.app_nav}>
             <Container maxWidth="xl">
                 <Toolbar disableGutters>
                     <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                     <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                         <IconButton
                             size="large"
                             aria-label="account of current user"
                             aria-controls="menu-appbar"
                             aria-haspopup="true"
                             onClick={handleOpenNavMenu}
                             color="inherit"
                         >
                             <MenuIcon />
                         </IconButton>

                         <Menu
                             id="menu-appbar"
                             anchorEl={anchorElNav}
                             anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                             keepMounted
                             transformOrigin={{vertical: 'top', horizontal: 'left',}}
                             open={Boolean(anchorElNav)}
                             onClose={handleCloseNavMenu}
                             sx={{display: { xs: 'block', md: 'none' },}} >


                             {pages.map((page) => (
                                 <MenuItem key={page} onClick={handleCloseNavMenu}>
                                     <Link href={`/${page}`}   textAlign="center">{page}</Link>
                                 </MenuItem>
                             ))}
                         </Menu>
                     </Box>



                     <Box className={styles.text_link} sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                         {pages.map((page) => (
                             <Link key={page} href={`/${page}`}>{page}</Link>

                         ))}

                     </Box>

                     <Box sx={{ flexGrow: 0 }}>
                         <Tooltip title="Open settings">
                             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                 <Avatar alt="Remy Sharp" src="./SA.jpg" />
                             </IconButton>
                         </Tooltip>
                         <Menu
                             sx={{ mt: '45px' }}
                             id="menu-appbar"
                             anchorEl={anchorElUser}
                             anchorOrigin={{
                                 vertical: 'top',
                                 horizontal: 'right',
                             }}
                             keepMounted
                             transformOrigin={{
                                 vertical: 'top',
                                 horizontal: 'right',
                             }}
                             open={Boolean(anchorElUser)}
                             onClose={handleCloseUserMenu}
                         >
                             {settings.map((setting) => (
                                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                     <Typography textAlign="center" onClick={(e)=>handleSetting(setting)}>{setting}</Typography>
                                 </MenuItem>
                             ))}
                         </Menu>
                     </Box>
                 </Toolbar>
             </Container>
         </AppBar>
     </Box>
    );
}

export default Nav;