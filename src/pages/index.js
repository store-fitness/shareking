import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import ProductTemplate from '../template/product';
import { currencyList } from '../components/variableStatic';
import { Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { Helmet } from 'react-helmet';
import Currency from '../components/Currency';
import { Box } from '@mui/system';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const IndexPage = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
     const [currency, setCurrency] = React.useState(currencyList[0]);
     const [isLoading, setIsLoading] = React.useState(true);

  const data = useStaticQuery(graphql`
    query {
     product:allContentfulSharekingEu {
    edges {
      node {
        backgroundColor
        
        description
        discount
        keyword
        image {
          file {
            url
            fileName
          }
        }
        longDescription {
          raw
        }
        paymentLink
        price
        textColor
        buttonText
        title
        whatsapp
      }
    }
  }
    }
  `);
  const productInfo = data.product.edges[0].node;
  const productImage = productInfo.image;
  const isDesktop = useMediaQuery('(min-width:600px)');
  console.log(productInfo)

  return (
  <Grid sx={{backgroundColor:productInfo?.backgroundColor ,display:'flex',flexDirection:'column',alignItems:'center'}} >
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
      
      <Typography component="h1" align="center" sx={{width:"100%",mt:"45px",position:'absolute',backgroundColor:'white',p:2,color:productInfo?.textColor,textTransform:'uppercase', mb: 1, fontSize: {md:'28px', xs:'18px'}}}>
        {productInfo?.title}
      </Typography>
      <Grid
        container
        component="section"
        sx={{
          position:'relative',
          marginTop:{md:'145px',xs:'120px'},
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
          backgroundColor: 'white',
          borderRadius: '10px',
          width:{md:'80%',xs:'90%'},
         

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

  <Box
    sx={{
      width: isDesktop ? '50%' : '100%',
      height: isDesktop ? '300px' : '200px', // fixe une hauteur constante
      borderRadius: '10px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white', // optionnel : pour éviter l’effet vide en attendant le chargement
    }}
  >
    <img
      src={
        currentIndex == 0
          ? productImage[0]?.file?.url
          : productImage[currentIndex]?.file?.url
      }
      alt={productInfo?.title}
      loading="lazy"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain', // ou 'cover' selon l’effet souhaité
        borderRadius: '10px',
      }}
    />
  </Box>
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
              height: { md: '90px', xs: '50px' }, // ← hauteur explicite
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '10px',
                opacity: index == currentIndex ? 0.5 : 1,
                boxShadow:
                  index == currentIndex
                    ? '0px 0px 10px rgba(0, 0, 0, 0.4)'
                    : 'none',
              }}
              src={image?.file?.url}
              loading="lazy"
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
          <Grid sx={{width:'90%'}}>
          <Currency
        currency={currency}
        setCurrency={setCurrency}
        currencyList={currencyList}
      />
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
                  <Typography align="center" sx={{ fontSize: '20px',textTransform:"uppercase" }}>
                    {productInfo?.buttonText}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ opacity: 0.4 }}>
                    Secure Payment
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
              {productInfo?.keyword?.map((tag, index) => (
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
          
        </Grid>
      
      </Grid>

  {/* <ProductTemplate product={product} /> */}

  </Grid>


  );
};

export default IndexPage;
