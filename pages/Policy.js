import React from 'react';
import {useRouter} from "next/router";
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Policy = () => {

    const router=useRouter()
    const{locale,locales}=router;
    const handleLanguage = (lang) => {
        router.push('/Policy', undefined, {locale: lang})
    }
    const { t:translate } = useTranslation('Policy');
    console.log(router)
    return (
        <div>
            {locales.map(item=>{
                return(
                    <Button onClick={()=>handleLanguage(item)} key={item}>{item}</Button>
                )
            })}
            <p>{translate('hello')}</p>
            <p>{translate('name')}</p>
        </div>
    );
};


export  async function  getStaticProps({locale}){

    return{
        props:{
            ...(await serverSideTranslations(locale,['Policy']))
        }
    }
}
export default Policy;