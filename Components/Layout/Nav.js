






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
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import AlertNotify from "../Model/AlertNotify";







const Nav=()=>{


    const {auth}=useSelector(state=>state.sliceAuth)
    const {testamentUser} = useSelector(state => state.sliceTestament)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [openRestPassword, setOpenPassword] = React.useState(false);
    const [isValid, setIsValid] = useState({status: '', title: ''})
    const [showAlert, setShowAlert] = useState(false);

    const router=useRouter()

    const { t:translate } = useTranslation('index');

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
        const lang=router.locale==='en' ? 'ar' : 'en';
        router.push(`${router.asPath}`, undefined, {locale: lang})
    }
    const handleRoute = (page) => {

        const routes = {
            'How to use': 'Howtouse',
            'كيفية الاستخدام': 'Howtouse',
            'Home': '/',
            'الصفحة الرئيسية': '/',
        };

        let route = routes[page]
        router.push(`${route}`)

    }
    const handleSetting = (type) => {
        handleCloseUserMenu()
        if (type === 'Setting'|| type ==='الاعدادات') {
            setOpen(true)
        } else if (type === 'Logout'|| type ==="تسجيل الخروج") {
            localStorage.removeItem('isUser')
            Cookie.remove('refresh_token')
            router.reload()
        } else if (type === 'reset password' || type === 'تغير كلمة السر') {
            setOpenPassword(true)
        }
    }
    const handleVoting=()=>{

        if (!auth.user){
            setShowAlert(true)
            setIsValid({status:'warning',title:translate('error_login')})

        }else if(!testamentUser.testament){
            setShowAlert(true)
            setIsValid({status:'info',title:translate('error_no_testament')})

        }else{
            router.push(`/voting?id=${auth.user._id}`)
        }


    }




    const pages = router.locale==='en'?[ 'Home','How to use']:["الصفحة الرئيسية","كيفية الاستخدام"]
    const settings = router.locale==='en'?[ "Setting","Logout","reset password"]:[ "الاعدادات","تسجيل الخروج","تغير كلمة السر"]


    const style_bg={
        background:auth.user===undefined||auth.user.role==='admin'||!auth.user||router.pathname!=='/'?'#077E71':"transparent"


    }

    if (open) {
        return <ModelSetting setOpen={setOpen} open={open}/>
    }
    if (openRestPassword) {
        return <ModelResetPassword setOpenPassword={setOpenPassword} openRestPassword={openRestPassword}/>
    }




    return (
        <Box className={styles.content_nav}>

            {showAlert&&<AlertNotify status={isValid.status}  title={isValid.title} showAlert={showAlert} setShowAlert={setShowAlert} />}


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
                                <MenuItem onClick={handleVoting} className={styles.translate}>
                                   <span> {router.locale === 'ar' ? 'التصويت ' : 'Voting'}</span>
                                </MenuItem>
                                <MenuItem onClick={handleLanguage} className={styles.translate}>
                                    {router.locale === 'ar' ? 'English' : 'العربية'}
                                </MenuItem>
                            </Menu>
                        </Box>

                        <Box className={styles.text_link} sx={{flexGrow: 1,alignItems:'center' ,display: {xs: 'none', md: 'flex'},gap:'40px'}}>
                            {pages.map((page,index) => (
                                <li  key={index} onClick={()=>handleRoute(page)} >{page}</li>

                            ))}

                            {/*desktop add some route ,I can not add inside array because this data contain conditional*/}

                            <li onClick={handleVoting} className={styles.translate}>
                                {router.locale === 'ar' ? 'التصويت' : ' Voting'}
                            </li>
                            <li onClick={handleLanguage} className={styles.translate}>
                                {router.locale === 'ar' ? 'English' : 'العربية'}
                            </li>




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
                                    <MenuItem key={index} onClick={(e)=>handleSetting(setting)}>
                                        <Typography textAlign="center" >{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>

                        </Box>:<Button onClick={()=>router.push('/login')} variant='contained' color='primary'>Login</Button>
                        }
                    </Toolbar>
                </Container>
            </AppBar>

        </Box>
    );
}

export default Nav;















