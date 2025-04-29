import { Box, Grid, Typography } from '@mui/material';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';

const SlidePresentation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = 5;
  useEffect(() => {
    // Génère un index aléatoire différent de l'actuel
    const getRandomIndex = (currentIndex, totalImages) => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * totalImages);
      } while (randomIndex === currentIndex);
      return randomIndex;
    };

    const interval = setInterval(() => {
      setActiveIndex((currentIndex) =>
        getRandomIndex(currentIndex, totalImages)
      );
    }, 5000); // Pause de 2 secondes

    return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage
  }, [activeIndex]);
  const slidePresentationPicture = useStaticQuery(graphql`
    query {
      slidePresentation: allFile(
        filter: { relativeDirectory: { eq: "hatspic/slidePresentation" } }
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
  `);
  const imagesTab = slidePresentationPicture?.slidePresentation.nodes;

  return (
    <>
      <Grid
        sx={{
          display: { md: 'flex', xs: 'none' },
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'wrap',
          mb: 2,
          p: 2,
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography
            align="left"
            variant="h2"
            sx={{ fontSize: '45px', color: 'white', ml: 3, mt: 3, mb: 1 }}
          >
            HATS MADE IT BY HEART
          </Typography>
        </Box>
        <Grid
          sx={{
            display: { md: 'flex', xs: 'none' },
            mt: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
            '&:hover > div:not(:hover)': {
              opacity: 0.7, // Applique l'effet de transparence uniquement aux autres images
              transform: 'scale(0.9)', // Réduit leur taille
              transition:
                'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
            },
          }}
        >
          {imagesTab?.map((image, index) => (
            <Box
              key={index}
              onClick={() => window.location.replace(`/store/${image.name}`)}
              sx={{
                flex: '1 0 calc(80% / imagesTab.length)', // Largeur uniforme
                width: '100%', // Empêche les débordements
                overflow: 'hidden',
                cursor: 'pointer',
                transition:
                  'box-shadow 1s ease-in-out ,border-radius 1s ease-in-out,transform 1s ease-in-out',
                position: 'relative', // Permet d'utiliser z-index
                '&:hover': {
                  transform: 'scale(1.1)', // L'image survolée s'agrandit
                  zIndex: 1, // Passe au-dessus des autres
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              <GatsbyImage
                style={{
                  height: '350px',
                  width: '100%', // Uniformise la largeur des images
                  objectFit: 'cover',
                  borderRadius:
                    index === 0
                      ? '30px 0px 0px 30px'
                      : index === imagesTab.length - 1
                      ? '0px 30px 30px 0px'
                      : '0px',
                }}
                image={getImage(image?.childrenImageSharp[0]?.gatsbyImageData)}
                alt={`slidePresentation-${image.name}`}
              />
            </Box>
          ))}
        </Grid>
      </Grid>

      <Grid
        sx={{
          display: { md: 'none', xs: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 3,
          p: 2,
        }}
      >
        <Box
          sx={{
            p: 1,
            mb: 2,
          }}
        >
          <Typography
            align="center"
            variant="h2"
            sx={{ fontSize: '45px', color: 'white' }}
          >
            HATS MADE IT BY HEART
          </Typography>
        </Box>

        <Grid
          sx={{
            display: { md: 'none', xs: 'flex' },
            mt: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          {imagesTab?.map((image, index) => {
            const isActive = index === activeIndex;
            const width = isActive
              ? '70%' // L'image active occupe 70%
              : `${30 / (imagesTab.length - 1)}%`; // Les autres partagent les 30% restants

            return (
              <Box
                key={index}
                sx={{
                  flex: `0 0 ${width}`, // Largeur dynamique
                  transition:
                    'flex-basis 0.5s ease-in-out, opacity 0.5s ease-in-out, transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: isActive
                    ? '0px 0px 20px 5px rgba(255, 255, 255, 0.8)' // Box shadow initial
                    : 'none',
                  zIndex: isActive ? 1 : 0, // Mettez en avant l'image active
                  transform: isActive ? 'scale(1.1)' : 'scale(0.9)', // Agrandit l'image active
                  opacity: isActive ? 1 : 0.7, // Réduit l'opacité des autres
                  alignSelf: isActive ? 'center' : 'flex-start', // Centre l'image active verticalement
                  borderRadius: '10px', // Arrondi les coins
                  animation: isActive
                    ? 'glow 2s infinite' // Ajout de l'animation pulsante
                    : 'none',
                }}
                onClick={() => window.location.replace(`/store/${image.name}`)}
              >
                {' '}
                {typeof window !== 'undefined' && (
                  <GatsbyImage
                    onClick={() =>
                      window.location.replace(`/store/${image.name}`)
                    }
                    style={{
                      height: '350px',
                      cursor: 'pointer',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                    image={getImage(
                      image?.childrenImageSharp[0]?.gatsbyImageData
                    )}
                    alt={`slidePresentation-${image.name}`}
                  />
                )}
              </Box>
            );
          })}
        </Grid>

        <style>
          {`
    @keyframes glow {
      0% {
        box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.3);
      }
      50% {
        box-shadow: 0px 0px 20px 10px rgba(255, 255, 255, 0.5);
      }
      100% {
        box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.3);
      }
    }
  `}
        </style>
      </Grid>
    </>
  );
};

export default SlidePresentation;
