import '../styles/globals.css'

import {wrapper} from "../Store/store";

import {appWithTranslation} from "next-i18next";


function MyApp({ Component, pageProps }) {


    return (
        <>


                <Component {...pageProps} />

        </>
    )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
