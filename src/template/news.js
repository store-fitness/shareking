import { Box } from '@mui/material';
import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import { Helmet } from 'react-helmet';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const NewsTemplate = ({ data }) => {
  console.log(data);
  const { html } = data.markdownRemark;
  const { title, date, imageName } = data.markdownRemark.frontmatter;
  const image = data?.file?.childrenImageSharp[0]?.gatsbyImageData;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta property="og:title" content={title} />
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <h1>{title}</h1>
        <p>{date}</p>
        {image && (
          <>
            <Box
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            >
              <GatsbyImage image={getImage(image)} alt={imageName} />
            </Box>
          </>
        )}

        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Box>
    </Layout>
  );
};

export default NewsTemplate;

export const query = graphql`
  query getNews($slug: String!, $image: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        imageName
      }
    }
    file(relativeDirectory: { eq: "blog" }, name: { eq: $image }) {
      childrenImageSharp {
        gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
    }
  }
`;
