import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/material';

import React, { useEffect, useState } from 'react';

import { keyframes } from '@emotion/react';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';

import { graphql, Link, useStaticQuery } from 'gatsby';
const moveUp = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(5%);
  }
`;
const moveUpMobile = keyframes`
  0% {
    transform: translateY(0%);
    scale: 1.1;
  }
  100% {
    transform: translateY(10%);
    scale: 1;
  }
   
`;

const HeadSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const query = useStaticQuery(
    graphql`
      query slideQuery {
        homeSlide: allFile(
          filter: { relativeDirectory: { eq: "hatspic/headerSlide/homeSlide" } }
        ) {
          nodes {
            name
            childrenImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
            id
          }
        }
      }
    `
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 5000);

    return () => clearInterval(interval); // Cleanup
  }, [currentIndex]);

  // const imagesTab = query.allFile.nodes;

  const generatHomeSlide = () => {
    const imagesTab = query?.homeSlide.nodes;
    if (imagesTab.length > 0) {
      return (
        <Box
          sx={{
            width: '100%',
            height: 'auto',

            objectFit: 'cover',
            transform: {
              md: 'translateY(10%)',
              xs: 'translateY(15%)',
            },

            animation: {
              md: `${moveUp} 10s ease-in-out infinite `,
              xs: `${moveUpMobile} 10s ease infinite`,
            },
          }}
        >
          <GatsbyImage
            image={getImage(
              imagesTab[currentIndex].childrenImageSharp[0].gatsbyImageData
            )}
            alt={`trucker-hat-${imagesTab[currentIndex].name}`}
          />
        </Box>
      );
    }
  };
  return (
    <>
      {' '}
      {typeof window !== 'undefined' && window.location.pathname == '/' && (
        <Grid
          container
          sx={{
            borderRadius: { md: '0px 0px 40px 0px', xs: '0px 0px 40px 40px' },
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            mb: 2,
          }}
        >
          <Grid
            md={8}
            xs={12}
            item
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '260px',
              boxShadow: '0px 0px 10px rgba(255,255, 255, 0.5)',
              alignItems: 'flex-start',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {generatHomeSlide()}
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
            sx={{
              display: 'flex',
              width: '100%',
              height: { md: 'auto', xs: '220px' },
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: { md: 2, xs: 2 },
              alignItems: 'center',
            }}
          >
            <Typography
              align="center"
              variant="h2"
              sx={{
                fontSize: '25px',
                textTransform: 'uppercase',
              }}
            >
              FITNESS FOR LIFE UNLOCK YOUR BEST SELF
            </Typography>
            <Box
              sx={{
                width: { xs: '100vw', md: 'auto' },
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
                borderRadius: '10px',
                boxSizing: 'border-box',
                '&:hover': {
                  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.6)',
                  borderRadius: '30px 10px 30px 30px',
                  transition: 'all  0.5s ease-in-out',
                },
              }}
            >
              <Typography
                variant="h2"
                align="center"
                sx={{
                  textTransform: 'uppercase',

                  p: 2,
                  fontSize: '16px',
                  color: 'black',
                }}
              >
                10% off on your first order
              </Typography>
            </Box>
            <Box>
              <Link to="/store">
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',

                    borderRadius: '10px',
                    width: '100%',
                    height: '50px',
                    fontSize: '18px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                      backgroundColor: 'black',
                      opacity: '0.7',
                      color: 'white',
                      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                >
                  order now
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default HeadSlide;
