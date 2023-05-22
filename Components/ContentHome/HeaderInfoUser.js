import React from 'react';

import styleImage from '../../styles/Images.module.scss'
import {Typography} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link'
import style from '../../styles/content_header_info_user.module.scss'
const HeaderInfoUser = () => {
    return (
        <div className={style.content_header_info_user}>

            <img className={styleImage.rounded_image_medium} src='./SA.jpg'/>

            <div className={style.data_user}>
                <h2 className={style.name}>owies hassan</h2>
                <div className={style.link_testament}>

                    <ShareIcon/>
                    <Link href='/sadasd'>http://aosdoaisdoasidsa/owies hassan</Link>
                </div>
                <div className={style.share_profile} >
                    <FacebookIcon/>
                    <TwitterIcon/>
                    <InstagramIcon/>
                </div>
            </div>


            {/*<img className={styleImage.rounded_image_medium} src='./SA.jpg'/>*/}

            {/*<div className={style.data_user}>*/}
            {/*   <h2 className={style.name}>owies hassan</h2>*/}
            {/*    <div className={style.link_testament}>*/}

            {/*        <ShareIcon/>*/}
            {/*        <Link href='/'>http://aosdoaisdoasidsa/owies hassan</Link>*/}
            {/*    </div>*/}
            {/*    <div className={style.share_profile} >*/}
            {/*        <FacebookIcon/>*/}
            {/*        <TwitterIcon/>*/}
            {/*        <InstagramIcon/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default HeaderInfoUser;