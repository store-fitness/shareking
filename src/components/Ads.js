import { Box, Grid } from '@mui/material';
import React from 'react';

const Ads = () => {
  return (
    <Grid>
      //example d'un google Ads
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          width: '100%',
          height: '200px',
          backgroundColor: 'red     ',
        }}
      >
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
        ></script>
      </Box>
    </Grid>
  );
};

export default Ads;
