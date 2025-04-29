import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  useMediaQuery,
} from '@mui/material';

import Layout from '../components/layout';
import { Helmet } from 'react-helmet';
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image';
import Currency from '../components/Currency';
import BlogSlide from '../components/BlogSlide';
import { currencyList } from '../components/variableStatic';
import JsonLdGenerator from '../components/JsonLdGenerator';

const Store = ({ pageContext}) => {

  const [currency, setCurrency] = React.useState(currencyList[2]);
  const isDesktop = useMediaQuery('(min-width:600px)');

  const data = useStaticQuery(
    graphql`
      query {
        
        logo: file(relativePath: { eq: "hatspic/store/logo.webp" }) {
          childrenImageSharp {
            gatsbyImageData(
              width: 600
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        siteInfo: site {
          siteMetadata {
            title
            description
            siteUrl
            author
            logo
            authorSite
            language
            keywords
          }
        }
      }
    `
  );
  const products = pageContext.product;
  const slideLogo = data?.logo?.childrenImageSharp[0]?.gatsbyImageData;
  const siteInfo = data?.siteInfo;

  const pageData = {
    title: 'Fitness For Life Shop',
    description:
      'Fitness For life Shop FFL: Best Hats Collection for men and women, 10% off and free shipping',
    logo: `${siteInfo.siteMetadata.logo}`,
    siteUrl: `${siteInfo.siteMetadata.siteUrl}/store`,
    author: 'Moretech',
  };
  return (
   
    <Layout>
      <Helmet>
        <title>Fitness For Life STORE</title>
        <link rel="canonical" href={`${siteInfo.siteMetadata.siteUrl}/store`} />
        <html lang={siteInfo.siteMetadata.language} />
        <meta name="description" content={siteInfo.siteMetadata.description} />
        <meta name="keywords" content={siteInfo.siteMetadata.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={siteInfo.siteMetadata.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
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
                FFL STORE
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
          <Currency
            setCurrency={setCurrency}
            currency={currency}
            currencyList={currencyList}
          />
        </Grid>
        <JsonLdGenerator site={pageData} type="WebSite" product={null} />
        {/* <JsonLdGenerator
          site={siteInfo?.siteMetadata}
          product={products}
          type="ItemList"
        /> */}

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
          {products.map((product, index) => (
            <Box
              key={index}
              component="article"
              sx={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                width: { md: '40%', xs: '100%' },
                gap: 2,
                cursor: 'pointer',

                marginBottom: '30px',
                borderRadius: '15px',
              }}
              id={product?.node?.link}
            >
              <Box
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '30%',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '10px 0px 0px 10px',
                  backgroundColor: 'red',

                  p: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontSize: '16px', fontWeight: 'bold' }}
                >
                  10% off
                </Typography>
              </Box>
              <Helmet>
                {/* Ajout des balises meta pour les mots-clés */}
                <meta
                  name="keywords"
                  content={product?.node?.relatedKeyword.join(', ')}
                />
              </Helmet>

              <img
                style={{
                  width: '40%',
                  height: '100%',
                  borderRadius: '15px 0px 0px 15px',
                }}
                src={
                 product?.node?.image[0]?.file?.url
                }
                alt={product?.node.title}
                loading="lazy"
                placeholder="blurred"
                layout="constrained"
              />
              <Divider
                sx={{
                  width: '1px',
                  height: '100px',
                  backgroundColor: 'GrayText',
                  opacity: '0.2',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  color: 'black',
                  flexDirection: 'column',
                  width: '60%',
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
                  {product?.node.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    marginTop: '10px',
                    fontSize: '16px',
                    textDecoration: 'line-through',
                  }}
                >
                  {' '}
                  {currency?.rate == 1.0 ? (
                    <>
                      {currency?.symbol}
                      {parseFloat(
                        product?.node?.discount * currency?.rate
                      ).toFixed(2)}{' '}
                    </>
                  ) : (
                    <>
                      {parseFloat(
                        product?.node?.discount * currency?.rate
                      ).toFixed(2)}{' '}
                      {currency?.symbol}
                    </>
                  )}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '24px',
                    color: 'red',
                    marginTop: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {currency?.rate == 1.0 ? (
                    <>
                      {currency?.symbol}
                      {parseFloat(
                        product?.node?.price * currency?.rate
                      ).toFixed(2)}{' '}
                    </>
                  ) : (
                    <>
                      {parseFloat(
                        product?.node?.price * currency?.rate
                      ).toFixed(2)}{' '}
                      {currency?.symbol}
                    </>
                  )}
                </Typography>
                <Box
                  sx={{
                    backgroundColor: 'black',
                    borderRadius: '10px 0px 10px 0px',
                    color: 'white',
                    boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.7)',
                    p: 1,
                    mt: 2,
                  }}
                >
                  <Link
                    to={`/store/${product?.node.link}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      align="center"
                      variant="h4"
                      sx={{ fontSize: '20px', color: 'white' }}
                    >
                      ORDER NOW
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={12}>
          <BlogSlide />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Store;
