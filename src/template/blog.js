import { Box, Grid, Typography } from '@mui/material';
import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import { Helmet } from 'react-helmet';
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image';
import FeaturedProducts from '../components/FeaturedProducts';
import BlogSlide from '../components/BlogSlide';
import { currencyList } from '../components/variableStatic';
import JsonLdGenerator from '../components/JsonLdGenerator';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
const BlogTemplate = ({ data }) => {
  const [currency, setCurrency] = React.useState(currencyList[2]);

  const  html  = documentToHtmlString(JSON.parse(data.blog.blogContent.raw));
  
  const { title, date, link } = data.blog;
  const image = data.blog.image.gatsbyImageData;
  const siteInfo = data.siteInfo.siteMetadata;
  const imageName = data.blog.image.title;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
        <meta
          property="og:image"
          content={`${siteInfo?.siteUrl}${getSrc(image)}`}
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: 'space-around',
          gap: 1,
        }}
      >
        <JsonLdGenerator site={siteInfo} type="article" product={data} />

        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              backgroundColor: 'whitesmoke',
              borderRadius: '10px',
              mt: 2,
            }}
          >
            <Typography variant="h1" sx={{ mb: 2, fontSize: '30px' }}>
              {title}
            </Typography>

            <Grid
              container
              sx={{
                mb: 3,
                width: '100%',
                justifyContent: 'center',
                gap: 2,
                flexDirection: { xs: 'column', md: 'row' }, // Colonne sur mobile, ligne sur desktop
              }}
            >
              {image && (
                <Grid item xs={12} md={6}>
                  <Box sx={{ width: '100%', height: 'auto' }}>
                    <GatsbyImage image={image} alt={imageName} />
                  </Box>
                </Grid>
              )}
              <Grid item xs={12} md={10}>
                <Box
                  sx={{
                    padding: 2,
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'arial, sans-serif',
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </Box>
                <Box
                  align="center"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    fontSize: '8px',
                    color: 'gray',

                    width: '100%',
                  }}
                  component={Link}
                  to={siteInfo?.authorSite}
                  target="_black"
                >
                  Created By {siteInfo?.author}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={2}
          sx={{
            mt: { md: 1, xs: 0 },
            p: '8px 0px 8px 0px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(250, 250, 250, 0.5)',
            backgroundColor: 'whitesmoke',
            height: '50%', // La hauteur s'adapte à celle du contenu
          }}
        >
          <Box
            sx={{
              p: 4,
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 'auto', // Laissez la hauteur s'adapter à la quantité de contenu
            }}
          >
            <Typography
              align="center"
              variant="h2"
              sx={{ fontSize: '18px', fontWeight: 'bold' }}
            >
              Get 10% off on all our Collection
            </Typography>
          </Box>

          <FeaturedProducts
            currencySlider={currency?.rate}
            currencySymbolSlider={currency?.symbol}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <BlogSlide />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default BlogTemplate;

export const query = graphql`
  query getBlog($slug: String!) {
     blog: contentfulFitnessforlifeBlog(link: { eq: $slug }) {
      title
      createdAt
      
      link
      blogContent {
        raw
      }
      image {
        gatsbyImageData(
          width: 600
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
        title
        url
      }
    }
    siteInfo: site {
      siteMetadata {
        title
        authorSite
        language
        logo
        description
        siteUrl
        author
      }
    }
  }
`;
