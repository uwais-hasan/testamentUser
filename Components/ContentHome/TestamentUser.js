import React from 'react';
import style from '../../styles/testament.module.scss'

const TestamentUser = ({testament}) => {

    return (
        <div className={style.testament}>
            <p >{testament}</p>
        </div>
    );
};

export default TestamentUser;