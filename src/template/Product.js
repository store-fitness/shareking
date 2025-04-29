import { Box, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import {  Link } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import Currency from '../components/Currency';
import { currencyList } from '../components/variableStatic';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Layout from '../components/layout';
const ProductTemplate = ({ product }) => {
  const [currentIndex, setCurrentIndex] = React.useState(2);
   const [currency, setCurrency] = React.useState(currencyList[2]);
  const productInfo = product
  const productImage = product.image;
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Helmet>
     
        <title>{productInfo?.title} - Buy Online</title>

        <meta
          name="description"
          content={
            productInfo?.description
          }
        />
        <meta name="keywords" content={productInfo?.keywords?.join(', ')} />
        <meta property="og:title" content={productInfo?.title} />
        <meta
          property="og:description"
          content={
            
            productInfo?.description 
          }
        />
        <meta
          property="og:image"
          content={`${productImage[0]?.file?.url}`}
         
          
        />
       
      </Helmet>

      <Currency
        currency={currency}
        setCurrency={setCurrency}
        currencyList={currencyList}
      />
    <Typography component="h1" align="center" sx={{textTransform:'uppercase',color:'violet', mb: 1, fontSize: {md:'38px', xs:'28px'}}}>
        {productInfo?.title}
      </Typography>
      <Grid
        container
        component="section"
        sx={{
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
          backgroundColor: 'white',
          borderRadius: '10px',

          mt: 2,
          p: 1,
        }}
      >
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
            p: 1,
          }}
        >
          <Grid
            item
            md={12}
            xs={12}
            sx={{
              mt: 4,
            }}
          >
            <Box
              sx={{
                color: 'black',
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',

                gap: 1,
              }}
            >
              
              <Divider
                variant="middle"
                orientation="horizontal"
                flexItem
                sx={{ width: '100%', height: '1px', color: 'GrayText' }}
              />
              <img
                style={{
                  width: isDesktop ? '50%' : '100%',
                  borderRadius: '10px',
                }}
                src={
                  currentIndex == 0
                    ? productImage[0]?.file?.url
                    : productImage[currentIndex]?.file?.url
                }
                loading='lazy'
                alt={productInfo?.title}
              />
            </Box>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: 'whitesmoke',
              borderRadius: '10px',

              justifyContent: 'space-around',
              alignItems: 'flex-start',
              p: 2,
              gap: 1,
              flexFlow: { xs: 'nowrap', md: 'wrap' },
            }}
          >
            {productImage?.map((image, index) => (
              <Box
                key={index}
                sx={{
                  width: isDesktop ? '15%' : '20%',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer',
                }}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    opacity: index == currentIndex ? 0.5 : 1,
                    boxShadow:
                      index == currentIndex
                        ? '0px 0px 10px rgba(0, 0, 0, 0.4)'
                        : 'none',
                  }}
                  src={ image?.file?.url}
                  loading='lazy'
                  alt={productInfo?.title}
                />
              </Box>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            p: 2,
            pl: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid>
            <Typography variant="h2" sx={{ mb: 1, fontSize: '28px' }}>
              {productInfo?.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                marginTop: '10px',
                fontSize: '16px',
                textDecoration: 'line-through',
              }}
            >
              {currency?.rate == 1.0 ? (
                <>
                  {currency?.symbol}
                  {parseFloat(
                    parseFloat(productInfo?.discount).toFixed(2) *
                      parseFloat(currency?.rate)
                  ).toFixed(2)}{' '}
                </>
              ) : (
                <>
                  {parseFloat(
                    parseFloat(productInfo?.discount).toFixed(2) *
                      parseFloat(currency?.rate)
                  ).toFixed(2)}{' '}
                  {currency?.symbol}
                </>
              )}
            </Typography>
            <Typography variant="h3" sx={{ mb: 1 }}>
              {currency?.rate == 1.0 ? (
                <>
                  {currency?.symbol}
                  {parseFloat(
                    parseFloat(productInfo?.price).toFixed(2) *
                      parseFloat(currency?.rate)
                  ).toFixed(2)}
                </>
              ) : (
                <>
                  {parseFloat(
                    parseFloat(productInfo?.price).toFixed(2) *
                      parseFloat(currency?.rate)
                  ).toFixed(2)}{' '}
                  {currency?.symbol}
                </>
              )}
            </Typography>
            <Typography
              variant="h4"
              sx={{ mb: 1, fontSize: '16px', fontWeight: 'bold' }}
            >
              FREE SHIPPING
            </Typography>
            <Link
              to={`${productInfo?.paymentLink}`}
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    m: '2rem 0rem 2rem 0rem',
                    display: 'flex',
                    width: '50%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    borderRadius: '10px',
                    color: 'white',
                    cursor: 'pointer',
                    p: 1,
                    '&:hover': {
                      backgroundColor: 'white',
                      color: 'black',
                      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
                    },
                    transition: 'all 0.5s ease-in-out',
                  }}
                >
                  <Typography align="center" sx={{ fontSize: '20px' }}>
                    BUY NOW
                  </Typography>
                  <Typography variant="subtitle2" sx={{ opacity: 0.4 }}>
                    Stripe payment
                  </Typography>
                </Box>{' '}
              </Box>
            </Link>
            <Typography variant="h4" sx={{ mb: 1, fontSize: '18px', mt: 2 }}>
              {productInfo?.description}
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              RELATED KEYWORDS
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {productInfo?.relatedKeyword?.map((tag, index) => (
                <Box
                  key={index}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Typography variant="subtitle2">{tag},</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box
          dangerouslySetInnerHTML={{ __html: documentToHtmlString(JSON.parse( productInfo?.longDescription.raw)) }}
            sx={{
              display: 'flex',
              mt: 4,
              fontFamily: 'arial, sans-serif',
              p: 5,
              backgroundColor: 'whitesmoke',
              borderRadius: '10px',
              flexDirection: 'column',
              gap: 1,
              '& ul': {
                listStyle: 'none',
                paddingLeft: 0,
                marginBottom: '20px',
              },
              '& li': {
                marginBottom: '10px',
                pl: 2,
                p: 1,
                fontSize: '1rem',
                color: '#444',
              },
              '& h2': {
                fontSize: '2rem',

                color: '#333',
                marginBottom: '1rem',
              },
              '& p': {
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#555',
              },
              '& strong': {
                fontWeight: 'bold',
                color: '#000',
              },
            }}
          /> 
          {/* <Box
            align="center"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 1,
              fontSize: '8px',
              color: 'rgb(213, 206, 206)',
              mb: 5,

              width: '100%',
            }}
            component={Link}
            to={siteInfo?.authorSite}
            target="_black"
          >
            Created By {siteInfo?.author}
          </Box> */}
        </Grid>
      
      </Grid>
    </>
  );
};

export default ProductTemplate;

