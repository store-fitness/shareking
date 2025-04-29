import React from 'react';
import { Grid } from '@mui/material';
import { graphql, useStaticQuery } from 'gatsby';
import SlidePresentation from './SlidePresentation';
import FeaturedProducts from './FeaturedProducts';
import Offre from './Offre';
import BlogSlide from './BlogSlide';
import { currencyList } from './variableStatic';
const HomePage = () => {
  const [currency, setCurrency] = React.useState(currencyList[2]);
  const data = useStaticQuery(graphql`
    query {
      products: allMarkdownRemark(
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

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <SlidePresentation />
      </Grid>

      <Grid item xs={12} md={12}>
        <FeaturedProducts
          currency={currency}
          currencyList={currencyList}
          setCurrency={setCurrency}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Offre />
      </Grid>
      <Grid item xs={12} md={12}>
        <BlogSlide />
      </Grid>
    </Grid>
  );
};

export default HomePage;
