import { Grid, Typography } from '@mui/material';
import React from 'react';

const DiscountSlide = () => {
  return (
    <Grid
      sx={{
        backgroundColor: 'white',
        p: '10px',

        display: 'flex',
        flexDirection: 'rox',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography align="center" variant="h1" sx={{ fontSize: '12px' }}>
        Get Your Favorit FFL HAT 10% OFF on orders over $49.99 with worldwide
        shipping! Shop now for great deals and global delivery.
      </Typography>
    </Grid>
  );
};

export default DiscountSlide;
