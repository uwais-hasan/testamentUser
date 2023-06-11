import React, {useState} from 'react';

import styleImage from '../../styles/Images.module.scss'
import {Button, IconButton, Typography} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link'
import style from '../../styles/content_header_info_user.module.scss'
import {useSelector} from "react-redux";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import {updateData, uploadImage} from "../../Utils/FetchData";
import Confirm from "../Model/Confirm";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
const HeaderInfoUser = () => {

    const {auth}=useSelector(state=>state.sliceAuth)
    const {testamentUser}=useSelector(state=>state.sliceTestament)

    const router=useRouter()
    const[image,setImage]=useState('')
    const [openConfirm,setOpenConfirm] = React.useState(false);
    const {t:translate}=useTranslation('index')


    const handleProfile=async (e)=>{
        setOpenConfirm(true)
        setImage(e.target.files[0])

    }

    const handleSubmitImage=async ()=>{

        const getImages = await uploadImage(image)
        await updateData('user/update', {picture: getImages},auth.access_Token)
        router.reload()

    }
    const shareOnFacebook = () => {
        const shareUrl = `https://www.google.com/?hl=chrome`; // الرابط الذي ترغب في مشاركته
        const shareTitle = "" // عنوان المشاركة
        const shareDescription = 'hello there'; // وصف المشاركة

        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&description=${encodeURIComponent(shareDescription)}`;

        window.open(facebookShareUrl, '_blank');
    };
    const shareOnTwitter = () => {
        const shareUrl = 'https://example.com'; // الرابط الذي ترغب في مشاركته
        const shareText = 'نص المشاركة'; // نص المشاركة

        const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

        window.open(twitterShareUrl, '_blank');
    };
    if (openConfirm){
        return <Confirm
            title='upload image'
            description='would you like to change your picture'
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
            funSubmit={handleSubmitImage}
            type={'updatePicture'}
            setImage={setImage}
            image={image}
        />
    }


    return (
        <div className={style.content_header_info_user}>

            <img className={styleImage.rounded_image_medium } src={image?URL.createObjectURL(image):auth.user.picture}/>
            <div style={{top:0,position:'absolute'}} >
                <IconButton  color="primary" aria-label="upload picture" component="label">
                    <input hidden  accept='image/*'  type="file"
                           onChange={(e) => handleProfile(e)}
                    />

                    <CameraAltIcon style={{fontSize:'50px'}}/>
                </IconButton>
            </div>




            <div className={style.data_user}>

                <h2 className={style.name}>{auth.user.name}</h2>

                {testamentUser.testament?<>
                    <div className={style.link_testament}>


                        <ShareIcon/>

                        <Link href={`/voting?name=${auth.user.name}&id=${auth.user._id}`}>{`http:localhost:3000/voting?name=${auth.user.name}&id=${auth.user._id}`}</Link>
                    </div>
                    <div className={style.share_profile} >
                        <FacebookIcon onClick={shareOnFacebook }/>
                        <TwitterIcon/>

                    </div>
                </> :<p className={style.warning_testament}>{translate('please_add_testament')}</p>}

            </div>

        </div>
    );
};

export default HeaderInfoUser;

