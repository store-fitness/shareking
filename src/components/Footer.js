import { Box, Grid, Typography, Link } from '@mui/material';
import React from 'react';
import ContactBar from './ContactBar';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgba(30, 30, 40, .9)',
        color: 'white',
        padding: { xs: 4, md: 6 },
        boxShadow: '0px -10px 20px rgba(0, 0, 0, 0.5)',
        mt: 10,
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        {/* Colonne 1 : Navigation */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            FITNESS FOR LIFE FFL
          </Typography>
          <Typography variant="subtitle1">
            FFL is a quality, creative, and committed brand
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          ></Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Quick Links
          </Typography>
          <Box
            sx={{
              fontFamily: 'arial',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Link
              href="/"
              sx={{
                color: 'white',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Home
            </Link>
            <Link
              href="/about"
              sx={{
                color: 'white',
                textDecoration: 'none',
                '&:hover': { color: 'underline' },
              }}
            >
              About us
            </Link>
            <Link
              href="/store"
              sx={{
                color: 'white',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Store
            </Link>
            <Link
              href="/blogs"
              sx={{
                color: 'white',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Blogs
            </Link>
            <Link
              href="/terms"
              sx={{
                color: 'white',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Terms
            </Link>
          </Box>
        </Grid>

        {/* Colonne 2 : Contact */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Contact Us
          </Typography>

          <Typography variant="subtitle2">
            First Floor, Unit 8, 10 Rodney Road, Southsea, England, PO4 8SY
          </Typography>
          <Typography variant="subtitle2">+44 7307 410512</Typography>
          <Typography variant="subtitle2">
            executive@fitnessforlife.pro
          </Typography>
          <ContactBar />
        </Grid>

        {/* Colonne 3 : Réseaux sociaux */}
      </Grid>

      {/* Bas du footer */}
      <Box
        sx={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          mt: 4,
          pt: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          Copyright © {new Date().getFullYear()} fitnessforlifehats.com. All
          rights reserved.
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 1,
          pt: 1,
          textAlign: 'center',
        }}
      >
        {' '}
        <Link href="https://www.moretech.ma" sx={{ color: 'gray' }}>
          <Typography variant="body2">Created By MoreTech</Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
