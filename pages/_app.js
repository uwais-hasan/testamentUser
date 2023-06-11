import '../styles/globals.css'

import {wrapper} from "../Store/store";

import {appWithTranslation} from "next-i18next";
import Layout from "../Components/Layout/Layout";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";


function MyApp({ Component, pageProps }) {

    console.log('app')

    const router=useRouter()
    return (
        <div style={{direction:router.locale==='en'?'ltr':'rtl'}}>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </div>
    )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
