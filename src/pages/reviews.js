import React from 'react';
import { graphql } from 'gatsby';
import { Box, Grid, Typography, Divider, useMediaQuery } from '@mui/material';
import Layout from '../components/layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';
import JsonLdGenerator from '../components/JsonLdGenerator';

const Reviews = ({ data }) => {
  const reviews = data?.reviews?.nodes;
  const isDesktop = useMediaQuery('(min-width:600px)');
  const siteInfo = data.siteInfo;

  const slideLogo = data?.logo?.childrenImageSharp[0]?.gatsbyImageData;
  const pageData = {
    title: 'Fitness For Life Shop - Customer Reviews',
    description:
      'Find the best Hats and Cap for your fitness needs at Fitness For Life Shop.',
    siteUrl: `${siteInfo.siteMetadata.siteUrl}/reviews`,
    logo: `${siteInfo.siteMetadata.logo}`,
    author: `${siteInfo.siteMetadata.author}`,
  };
  return (
    <Layout>
      <Helmet>
        <title>Fitness For Life Shop | Customer Reviews</title>
        <link rel="canonical" href={`${siteInfo.siteMetadata.siteUrl}`} />
        <html lang={siteInfo.siteMetadata.language} />
        <meta name="description" content={siteInfo.siteMetadata.description} />

        <meta name="robots" content="index, follow" />
        <meta name="author" content={siteInfo.siteMetadata.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <JsonLdGenerator site={pageData} type="Review" product={reviews} />
      <Grid container sx={{ mt: 8 }}>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              position: 'relative',
              backgroundColor: 'whitesmoke',
              display: 'flex',
              flexDirection: 'row-inverse',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 5,
              borderRadius: { xs: '0px 30px  30px 0px', md: '0px' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '70%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'whitesmoke',
                height: '100%',
                p: 3,

                color: 'black',
                position: 'relative',
              }}
            >
              <Typography
                variant="h2"
                align="center"
                sx={{ fontSize: { md: '38px', xs: '28px' }, mb: 1 }}
              >
                FFL Customer Reviews
              </Typography>

              <Typography variant="h3" align="center" sx={{ fontSize: '20px' }}>
                BEST HATS COLLECTION
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
                position: 'relative',
              }}
            >
              <GatsbyImage
                style={{
                  width: isDesktop ? '30%' : '100%',
                  position: 'absolute',

                  objectFit: 'cover',
                  borderRadius: '40px',
                }}
                image={getImage(slideLogo)}
                alt="store FFL"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 0px 15px rgba(250, 250, 250, 0.5)',
              borderRadius: '10px',
              mb: 4,
              p: 1,
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://firebasestorage.googleapis.com/v0/b/backend-test-6750b.appspot.com/o/fitnessforlife_store_reel_25_09_2024_07_01_393464696455291290541.mp4?alt=media&token=16f9fb3e-4829-4dfd-8638-c50ad12157c3"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '200px',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
            <Typography
              variant="h3"
              align="center"
              sx={{ p: 4, fontSize: '20px', color: 'white' }}
            >
              Every cap in our inventory is handpicked and rigorously tested to
              make sure it lives up to our high standards
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          component="section"
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            backgroundColor: 'black',
            p: 2,
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {reviews.map((review, index) => (
            <Box
              key={index}
              component="article"
              sx={{
                display: 'flex',
                position: 'relative',
                flexDirection: { md: 'row', xs: 'column' },
                backgroundColor: 'white',
                alignItems: 'center',
                width: { md: '40%', xs: '100%' },

                gap: 1,
                cursor: 'pointer',
                marginBottom: { md: '30px', xs: '0px' },
                borderRadius: '15px',

                p: 1,
              }}
            >
              <Box sx={{ height: '150px', width: '40%' }}>
                <GatsbyImage
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '70px',
                  }}
                  image={getImage(
                    review.frontmatter.thumb.childImageSharp.gatsbyImageData
                  )}
                  alt={review.frontmatter.name}
                  loading="lazy"
                />
              </Box>

              <Divider
                sx={{
                  width: { md: '1px', xs: '100px' },
                  height: { md: '100px', xs: '1px' },
                  backgroundColor: 'GrayText',
                  opacity: '0.2',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  color: 'black',
                  flexDirection: 'column',
                  width: '80%',
                  p: 1,
                }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { md: '18px', xs: '16px' },
                    marginTop: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  {review.frontmatter.name}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    marginTop: '10px',
                    fontSize: '16px',
                    color: 'gold',
                  }}
                >
                  {'⭐'.repeat(Math.floor(review.frontmatter.notation))} (
                  {review.frontmatter.notation.toFixed(1)})
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '16px',
                    marginTop: '10px',
                  }}
                >
                  "{review.frontmatter.commentaire}"
                </Typography>
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>{' '}
    </Layout>
  );
};

export default Reviews;
export const pageQuery = graphql`
  query {
    reviews: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "review" } } }
    ) {
      nodes {
        frontmatter {
          name
          commentaire
          notation
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
      }
    }
    siteInfo: site {
      siteMetadata {
        title
        description
        siteUrl
        logo
        language
        authorSite
        author
      }
    }
    logo: file(relativePath: { eq: "hatspic/store/logo.webp" }) {
      childrenImageSharp {
        gatsbyImageData(
          width: 600
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`;
