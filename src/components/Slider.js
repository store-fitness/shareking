import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Box, Typography } from '@mui/material';

const Slider = ({ item }) => {
  const data = useStaticQuery(graphql`
    query {
      digital_products: allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { type: { eq: "product" } } }
        limit: 4
      ) {
        nodes {
          frontmatter {
            title
            slug
            date
            description
            thumb {
              childImageSharp {
                gatsbyImageData(
                  width: 600
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
          id
        }
      }
    }
  `);
  const slides = data[item]?.nodes || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);
  const currentSlide = slides[currentIndex];

  return (
    <Box
      sx={{
        position: 'relative',
        height: '400px',
        overflow: 'hidden',
      }}
    >
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            opacity: index === currentIndex ? 1 : 0,
            transform:
              index === currentIndex ? 'translateX(0)' : 'translateX(-100%)',
          }}
        >
          <GatsbyImage
            loading="eager"
            image={slide?.frontmatter?.thumb?.childImageSharp?.gatsbyImageData}
            alt={slide.frontmatter.title}
          />
          <Typography
            variant="h3"
            sx={{ marginTop: 2, fontSize: '24px', fontWeight: 'bold' }}
          >
            {slide.frontmatter.title}
          </Typography>
          <Typography variant="h4" sx={{ marginTop: 2, fontSize: '18px' }}>
            {slide.frontmatter.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Slider;
