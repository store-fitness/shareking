import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';
import HeadSlide from '../components/HeadSlide';

import DiscountSlide from './DiscountSlide';

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <DiscountSlide />

        <Navbar />
        <HeadSlide />
      </header>{' '}
      <Grid
        container
        component="main"
        sx={{
          backgroundColor: 'black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item md={12} xs={12} component="section">
          {children}
        </Grid>
      </Grid>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
