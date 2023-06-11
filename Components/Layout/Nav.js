






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

import ModelSetting from "../Model/modelSetting";
import {useRouter} from "next/router";
import Cookie from "js-cookie";
import ModelResetPassword from "../Model/modelResetPassword";
import {useSelector} from "react-redux";
import {Button, Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import GTranslateIcon from '@mui/icons-material/GTranslate';






const Nav=()=>{


    const {auth}=useSelector(state=>state.sliceAuth)

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const [open, setOpen] = React.useState(false);
    const [openRestPassword, setOpenPassword] = React.useState(false);


    const router=useRouter()
    const { t:translate } = useTranslation('index');
    const lang=router.locale==='en' ? 'ar' : 'en';
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
    const handleLanguage = () => {

        router.push(`${router.asPath}`, undefined, {locale: lang})
    }
    const handleRoute = (page) => {

        let route = (page === 'How to use' || page === "كيفية الاستخدام") ? 'Howtouse' : (page === 'Home' || page === 'الصفحة الرئيسية') ? '/' : ''

        router.push(`${route}`, undefined, {locale: lang})

    }
    const handleSetting = (type) => {

        if (type === 'Setting'|| type ==='الاعدادات') {
            setOpen(true)
        } else if (type === 'Logout'|| type ==="تسجيل الخروج") {
            Cookie.remove('refresh_token')
            localStorage.removeItem('isUser')
            router.push('/login')
        } else if (type === 'reset password' || type === 'تغير كلمة السر') {
            setOpenPassword(true)
        }
    }


    const pages = router.locale==='en'?[ 'Home','How to use']:["الصفحة الرئيسية","كيفية الاستخدام"]
    const settings = router.locale==='en'?[ "Setting","Logout","reset password"]:[ "الاعدادات","تسجيل الخروج","تغير كلمة السر"]


    const style_bg={
        background:auth.user===undefined||auth.user.role==='admin'||!auth.user||router.pathname!=='/'?'#750c82':"transparent"


    }

    if (open) {
        return <ModelSetting setOpen={setOpen} open={open}/>
    }
    if (openRestPassword) {
        return <ModelResetPassword setOpenPassword={setOpenPassword} openRestPassword={openRestPassword}/>
    }





    return (
        <Box className={styles.content_nav}>



            <AppBar style={style_bg} className={styles.app_nav}>
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


                                {pages.map((page,index) => (

                                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                                        <span onClick={() => handleRoute(page)}>{translate(page)}</span>
                                    </MenuItem>

                                ))}
                                {/*mobile*/}
                                <Grid onClick={handleLanguage } className={styles.translate} container alignItems='center' justifyContent='center' gap={2} >
                                    <GTranslateIcon />
                                    {router.locale === 'ar' ? 'English' : 'العربية'}
                                </Grid>
                            </Menu>
                        </Box>

                        <Box className={styles.text_link} sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'},gap:'40px'}}>
                            {pages.map((page,index) => (
                                <li  key={index} onClick={()=>handleRoute(page)} >{page}</li>

                            ))}

                            {/*desktop*/}
                            <Grid onClick={handleLanguage } className={styles.translate}  container alignItems='center' gap={1} >
                                <GTranslateIcon />
                                {router.locale === 'ar' ? 'English' : 'العربية'}
                            </Grid>
                        </Box>
                        {auth.user!==undefined?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                   <Avatar alt="Remy Sharp" src={auth.user.picture} />
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
                                {settings.map((setting,index) => (
                                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={(e)=>handleSetting(setting)}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>

                        </Box>:<Button variant='contained' color='secondary'>Login</Button>
                        }
                    </Toolbar>
                </Container>
            </AppBar>

        </Box>
    );
}

export default Nav;











