import React, {Fragment} from 'react';
import styles from "../../styles/content_details_testament.module.scss";
import {useSelector} from "react-redux";

const TestamentUser = ({testament}) => {

    return (
        <Fragment>
            <p className={styles.testament_user}>{testament}</p>
        </Fragment>
    );
};

export default TestamentUser;