import React from 'react';
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";

const How_to_use = () => {

    const{locale}=useRouter()
    const { t } = useTranslation();
    return (
        <div>
            <p>{locale}</p>
            <p>{t('common:hello')}</p>
        </div>
    );
};

export default How_to_use;