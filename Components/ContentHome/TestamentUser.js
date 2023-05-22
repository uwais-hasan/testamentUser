import React, {Fragment} from 'react';
import styles from "../../styles/content_details_testament.module.scss";

const TestamentUser = () => {
    return (
        <Fragment>
            <p className={styles.testament_user}>
                If true, the ripple effect is disabled.
                ⚠️ Without a ripple there is no styling
                If true, the ripple effect is disabled.
                ⚠️ Without a ripple there is no styling for :focus-visible by default.
                Be sure to highlight the element
                by applying separate styles with the .Mui-focusVisible class.for :focus-visible by
                default. Be sure to highlight the
                element by applying separate styles with the .Mui-focusVisible class.</p>
        </Fragment>
    );
};

export default TestamentUser;