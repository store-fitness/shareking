import { Grid, Box, Typography } from '@mui/material';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

const ContactBar = () => {
  const data = useStaticQuery(graphql`
    query getContact {
      getInstagram: allFile(
        filter: { relativePath: { eq: "hatspic/logo/instagram.webp" } }
      ) {
        nodes {
          childrenImageSharp {
            gatsbyImageData(
              width: 300
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
      getWhatsapp: allFile(
        filter: { relativePath: { eq: "hatspic/logo/whatsapp.webp" } }
      ) {
        nodes {
          childrenImageSharp {
            gatsbyImageData(
              width: 300
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  `);
  const whatsappLogo =
    data.getWhatsapp.nodes[0].childrenImageSharp[0].gatsbyImageData;
  const instagramLogo =
    data.getInstagram.nodes[0].childrenImageSharp[0].gatsbyImageData;
  return (
    <Grid
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          backgroundColor: 'white',
          color: 'black',
          p: 1,
          borderRadius: '10px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Typography
          sx={{ fontSize: { md: '16px', xs: '12px' }, fontWeight: '600' }}
        >
          {' '}
          Contact Us
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '35%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Link href="https://wa.me/447307410512" target="_blank">
            <GatsbyImage
              style={{ borderRadius: '10px', width: '30px' }}
              image={getImage(whatsappLogo)}
              alt="whatsapp logo"
            />
          </Link>
          <Link
            href="https://www.instagram.com/fitnessforlife_store/"
            target="_blank"
          >
            <GatsbyImage
              style={{ borderRadius: '10px', width: '35px' }}
              image={getImage(instagramLogo)}
              alt="instagram logo"
            />
          </Link>
        </Box>
      </Box>
    </Grid>
  );
};

export default ContactBar;
