import React from 'react';
import AccordionInfoUser from "./AccordionInfoUser";
import HeaderInfoUser from "./HeaderInfoUser";

const InfoUser = () => {
    return (
        <div  style={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'}}>
           <HeaderInfoUser/>
            <AccordionInfoUser/>
        </div>
    );
};

export default InfoUser;