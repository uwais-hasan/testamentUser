import '../styles/globals.css'

import {wrapper} from "../Store/store";

import {appWithTranslation} from "next-i18next";
import Layout from "../Components/Layout/Layout";

import {useRouter} from "next/router";
import {createTheme,ThemeProvider} from "@mui/material";
import React, {useEffect} from "react";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../styles/nprogress.css';
import Head from "next/head";
import {useTranslation} from "react-i18next";

function MyApp({ Component, pageProps }) {
    const { t:translate } = useTranslation('index');

    const router=useRouter()
    const theme = createTheme({
       palette:{
           primary:{
               main:'#077E71'
           }
       },
        components: {
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        background: '#22262F',
                        color: '#fff',
                    },
                },
            },
            MuiDialogContentText: {
                styleOverrides: {
                    root: {
                        color: '#fff ',

                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: '#077E71',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#fff ',

                        color:'#000' ,
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        color:'#077E71' ,
                    },
                },
            },
            MuiTableContainer:{
                styleOverrides:{
                    root: {
                        backgroundColor:'#22262F'
                    }

                }
            }
        },


    });


    useEffect(() => {


        router.events.on('routeChangeStart',  ()=>NProgress.start());
        router.events.on('routeChangeComplete', ()=>NProgress.done());
        router.events.on('routeChangeError', ()=> NProgress.done());

        return () => {
            router.events.off('routeChangeStart', ()=>NProgress.start());
            router.events.off('routeChangeComplete', ()=>NProgress.done());
            router.events.off('routeChangeError', ()=>NProgress.done());
        };
    }, []);
    return (
        <div style={{direction:router.locale==='en'?'ltr':'rtl'}}>

            <Head>
                <title>{translate('title_app')}</title>
                <meta name="description" content={translate('description_meta_app')}/>
                <link rel='icon' href='/logo.png'/>

            </Head>
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </div>
    )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
