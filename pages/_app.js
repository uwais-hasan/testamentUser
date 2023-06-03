import '../styles/globals.css'

import {wrapper} from "../Store/store";
import Layout from "../Components/Layout/Layout";



function MyApp({ Component, pageProps }) {


    return (
        <>


                <Component {...pageProps} />

        </>
    )
}

export default wrapper.withRedux(MyApp)
