import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Box, Grid, Typography } from '@mui/material';
import Layout from '../components/layout';

const ReviewsList = ({ pageContext }) => {
  const { reviews } = pageContext;

  return (
    <Layout>
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ fontSize: '32px', mb: 4 }}>
          Customer Reviews
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {reviews.map((review, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: '100%', sm: '45%', md: '30%' },
              p: 3,
              backgroundColor: '#fff',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              mb: 4,
            }}
          >
            <GatsbyImage
              image={getImage(review.frontmatter.image)}
              alt={review.frontmatter.reviewer}
              style={{
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                margin: '0 auto',
              }}
            />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
              {review.frontmatter.reviewer}
            </Typography>
            <Typography variant="body2" sx={{ color: 'gold', mt: 1 }}>
              {'⭐'.repeat(Math.floor(review.frontmatter.stars))} (
              {review.frontmatter.stars.toFixed(1)})
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
              "{review.frontmatter.recommendation}"
            </Typography>
          </Box>
        ))}
      </Grid>
    </Layout>
  );
};

export default ReviewsList;
