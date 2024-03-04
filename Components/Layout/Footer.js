import React from 'react';

import styles from '../../styles/footer.module.scss'

import {Link, Grid} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';


const Footer = () => {




    return (
        <footer className={styles.footer} >
          <Grid container justifyContent='space-evenly' alignItems='center' >
              <p>copyRight © 2023 - Uwais Hasan</p>
              <div>
                  <Link href='mailto:uwais.h.a.hasan@gmail.com' color="inherit">
                      <EmailIcon />
                  </Link>
                  <Link href="https://www.linkedin.com/in/uwais-hasan-803024231" >
                      <LinkedInIcon />
                  </Link>
                  <Link href="https://www.facebook.com/profile.php?id=100010097286350/" >
                      <FacebookIcon />
                  </Link>

              </div>
          </Grid>


        </footer>
    );
};

export default Footer;

