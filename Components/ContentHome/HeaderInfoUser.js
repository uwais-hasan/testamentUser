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
const HeaderInfoUser = () => {

    const {auth}=useSelector(state=>state.sliceAuth)
    const {testamentUser}=useSelector(state=>state.sliceTestament)

    const router=useRouter()
    const[image,setImage]=useState('')
    const [openConfirm,setOpenConfirm] = React.useState(false);



    const handleProfile=async (e)=>{
        setOpenConfirm(true)
        setImage(e.target.files[0])

    }

    const handleSubmitImage=async ()=>{

        const getImages = await uploadImage(image)
        await updateData('user/update', {picture: getImages},auth.access_Token)
        router.reload()

    }

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
                        <FacebookIcon/>
                        <TwitterIcon/>
                        <InstagramIcon/>
                    </div>
                </> :<p className={style.warning_testament}>please add a testament to see your testament</p>}

            </div>

        </div>
    );
};

export default HeaderInfoUser;

