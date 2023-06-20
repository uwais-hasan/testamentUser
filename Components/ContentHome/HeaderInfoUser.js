import React, {useState} from 'react';

import styleImage from '../../styles/Images.module.scss'
import {Button, IconButton} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link'
import style from '../../styles/content_header_info_user.module.scss'
import {useDispatch, useSelector} from "react-redux";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import {updateData, uploadImage} from "../../Utils/FetchData";
import Confirm from "../Model/Confirm";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import AlertNotify from "../Model/AlertNotify";
import useWidth from "../../Hooks/useWidth";
import {showNotify} from "../../Store/Slicess/SliceNotify";

const HeaderInfoUser = () => {


    const dispatch=useDispatch()
    const{Alert}=useSelector(state=>state.sliceNotify)

    const router=useRouter()
    const {width} = useWidth()

    const {auth}=useSelector(state=>state.sliceAuth)
    const {testamentUser}=useSelector(state=>state.sliceTestament)
    const {t:translate}=useTranslation('index')

    const[image,setImage]=useState('')
    const [openConfirm,setOpenConfirm] = useState(false);
    const [copied, setCopied] = useState(false);

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
        const shareUrl = `${process.env.NEXT_PUBLIC_URL}/voting?id=${auth.user._id}`;
        const shareTitle = "share title"
        const shareDescription = 'description content';

        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&description=${encodeURIComponent(shareDescription)}`;

        window.open(facebookShareUrl, '_blank');
    };
    const shareOnTwitter = () => {
        const shareUrl = `${process.env.NEXT_PUBLIC_URL}/voting?id=${auth.user._id}`; // الرابط الذي ترغب في مشاركته
        const shareText = 'نص المشاركة'; // نص المشاركة

        const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

        window.open(twitterShareUrl, '_blank');
    };
    const handleCopyLink = async () => {
        try {
            let url=`${process.env.NEXT_PUBLIC_URL}/voting?id=${auth.user._id}`
            await navigator.clipboard.writeText(url);
            setCopied(true);
            dispatch(showNotify({showAlert:true,status:'success',title:translate('copy_link')}))

        }
        catch (error) {

            dispatch(showNotify({showAlert:true,status:'error',title:translate('error_copy_link')}))

        }
    };



    return (
        <div className={style.content_header_info_user}>
            {Alert.showAlert&&<AlertNotify status={Alert.status}  title={Alert.title} showAlert={Alert.showAlert} />}
            {openConfirm&&  <Confirm title='upload image' description='would you like to change your picture' openConfirm={openConfirm} setOpenConfirm={setOpenConfirm} funSubmit={handleSubmitImage} type={'updatePicture'} setImage={setImage} image={image}/>}
            <img  className={styleImage.rounded_image_medium } src={image?URL.createObjectURL(image):auth.user.picture} alt={'image user'} loading='lazy'/>
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
                        {width>768&&<ShareIcon/>}
                        <Link  href={`${process.env.NEXT_PUBLIC_URL}/voting?id=${auth.user._id}`}>{`${process.env.NEXT_PUBLIC_URL}/voting?id=${auth.user._id}`}</Link>

                        <Button onClick={handleCopyLink} variant='contained'>Copy your Link</Button>
                    </div>
                    <div className={style.share_profile} >
                        <FacebookIcon onClick={shareOnFacebook }/>
                        <TwitterIcon onClick={shareOnTwitter}/>

                    </div>
                </> :<p className={style.warning_testament}>{translate('please_add_testament')}</p>}

            </div>

        </div>
    );
};

export default HeaderInfoUser;

