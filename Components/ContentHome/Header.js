import React from 'react';

import styles from '../../styles/Header.module.scss'

import styleImage from '../../styles/Images.module.scss'






const Header = () => {
    return (
        <div className={styles.content_header}>

            <img className={styleImage.image_header}
                 src='./BG.jpeg'
                 alt='BG_testament'
                 loading="lazy"

            />

        </div>
    );
};

export default Header;