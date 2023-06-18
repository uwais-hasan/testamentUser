import '../styles/globals.css'

import {wrapper} from "../Store/store";

import {appWithTranslation} from "next-i18next";
import Layout from "../Components/Layout/Layout";

import {useRouter} from "next/router";
import {createTheme,ThemeProvider} from "@mui/material";
import {useEffect} from "react";
import NProgress from 'nprogress'; // استيراد مكتبة NProgress
import 'nprogress/nprogress.css'; // استيراد ملف الأنماط الخاص بـ NProgress
import '../styles/custom-nprogress.css';
// NProgress.configure({color:'red', showSpinner: false, minimum: 0.1, easing: 'ease', speed: 800 });

function MyApp({ Component, pageProps }) {
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
                        color: '#fff ', // تعيين لون النص الداخلي

                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: '#077E71', // تعيين لون الـ label
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#fff ', // تعيين لون خلفية الـ TextField

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

            <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            </ThemeProvider>
        </div>
    )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
