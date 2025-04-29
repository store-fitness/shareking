import { Box, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { Helmet } from 'react-helmet';
import Currency from './Currency';
import { useRef } from 'react';
import JsonLdGenerator from './JsonLdGenerator';
const FeaturedProducts = ({
  currency,
  currencyList,
  setCurrency,
  currencySlider,
  currencySymbolSlider,
}) => {
  const isDesktop = useMediaQuery('(min-width:600px)');

  const queryProduct = useStaticQuery(graphql`
    {
      site: site {
        siteMetadata {
          title
          description
          siteUrl
          logo
          language
          author
          authorSite
        }
      }
      logo: file(relativeDirectory: { eq: "hatspic" }) {
        childrenImageSharp {
          gatsbyImageData(
            width: 300
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      featuredProducts: allContentfulFitnesforlifeProduct {
    totalCount
    edges {
      node {   
       bestSeller
        classement
        createdAt
        description
        discount
        link
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
        relatedKeyword
        title

      }
    }
  }

      blogs: allContentfulFitnessforlifeBlog(
      sort: { createdAt: DESC }
      filter: { onPage: { eq: true } }
    ) {
      nodes {
        link
        title
      }
    }
    }
  `);
  // const products = queryProduct?.featuredProducts?.nodes || [];
  const products = queryProduct?.featuredProducts?.edges;
  const logo = queryProduct?.logo?.childrenImageSharp[0].gatsbyImageData;
  const site = queryProduct?.site?.siteMetadata;
 
  return (
    <Grid
      sx={{
        backgroundColor: 'whitesmoke',
        display: 'flex',
        flexDirection: 'column',
      }}
      component="section"
    >
      {typeof window !== 'undefined' && (
        <>
          {window?.location?.pathname == '/' ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'row-reverse' },
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    width: { xs: '50%', md: '80%' },
                    fontWeight: 'bold',
                    color: 'black',
                    textTransform: 'uppercase',
                    p: 1,
                    fontSize: '25px',
                  }}
                >
                  Featured Products
                </Typography>
                <GatsbyImage
                  style={{ width: isDesktop ? '120px' : '50%' }}
                  image={getImage(logo)}
                  alt="logo"
                />
              </Box>

              <Grid sx={{ backgroundColor: 'black' }}>
                <Currency
                  currency={currency}
                  currencyList={currencyList}
                  setCurrency={setCurrency}
                />
              </Grid>

              <Grid
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
                    id={product.node.link}
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
                    {/* <JsonLdGenerator
                      site={site}
                      product={products}
                      type="ItemList"
                    /> */}

                    <img
                      style={{
                        width: '40%',
                        height: '100%',
                        borderRadius: '15px 0px 0px 15px',
                      }}
                      src={
                        product?.node?.image[0]?.file?.url
                      }
                      alt={product.node.title}
                      loading="lazy"
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
                        {product.node.title}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          marginTop: '10px',
                          fontSize: '16px',
                          textDecoration: 'line-through',
                        }}
                      >
                        {currency?.symbol}{' '}
                        {parseFloat(
                          product?.node?.discount * currency?.rate
                        ).toFixed(2)}
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
                        {currency?.symbol}{' '}
                        {parseFloat(
                          product?.node?.price * currency?.rate
                        ).toFixed(2)}
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
                        {' '}
                        <Link
                          to={`/store/${product.node.link}/`}
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
            </>
          ) : (
            <>
              <Grid>
                {typeof window !== 'undefined' && (
                  <>
                    {/* Section des produits */}

                    {window.location.pathname.includes('/blogs') ? (
                      <>
                        <Grid
                          item
                          xs={12}
                          component="section"
                          md={12}
                          sx={{
                            mt: { md: 0, xs: 2 },
                            p: 2,
                            display: 'flex',
                            flexDirection: { xs: 'row', md: 'column' }, // Ligne sur mobile, colonne sur desktop
                            overflowX: { xs: 'auto', md: '' }, // Défilement horizontal uniquement sur mobile
                            scrollSnapType: { xs: 'x mandatory', md: 'none' }, // Snap uniquement sur mobile
                            gap: 2,

                            cursor: { xs: 'grab', md: 'default' }, // Curseur interactif uniquement sur mobile
                          }}
                          onMouseDown={(e) => {
                            if (window.innerWidth >= 900) return; // Désactiver le glissement sur desktop (900px correspond à `md` par défaut dans MUI)

                            const grid = e.currentTarget;
                            let startX = e.pageX - grid.offsetLeft;
                            let scrollLeft = grid.scrollLeft;

                            const onMouseMove = (moveEvent) => {
                              const x = moveEvent.pageX - grid.offsetLeft;
                              const walk = x - startX; // Distance de défilement
                              grid.scrollLeft = scrollLeft - walk;
                            };

                            const onMouseUp = () => {
                              grid.removeEventListener(
                                'mousemove',
                                onMouseMove
                              );
                              grid.removeEventListener('mouseup', onMouseUp);
                              grid.removeEventListener('mouseleave', onMouseUp);
                              grid.style.cursor = 'grab'; // Restaurer le curseur par défaut
                            };

                            grid.addEventListener('mousemove', onMouseMove);
                            grid.addEventListener('mouseup', onMouseUp);
                            grid.addEventListener('mouseleave', onMouseUp);
                            grid.style.cursor = 'grabbing'; // Changer le curseur pour un effet actif
                          }}
                        >
                          {products.map((product, index) => (
                            <Box
                              key={index}
                              component="article"
                              sx={{
                                scrollSnapAlign: { xs: 'start', md: 'none' }, // Alignement uniquement sur mobile
                                flex: { xs: '0 0 48%', md: '0 0 100%' }, // Largeur sur mobile (2 produits par ligne), pleine largeur sur desktop
                                borderRadius: '10px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                minHeight: '200px',

                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                  transform: 'scale(1.05)', // Effet hover
                                },
                              }}
                            >
                              {/* Image du produit */}
                              <img
                                style={{
                                  width: '100%',
                                  height: '150px',
                                  objectFit: 'cover',
                                }}
                                src={
                                  product?.node?.image[0]?.file?.url
                                }
                                alt={product.node.title}
                                loading="lazy"
                              />
                              {/* Contenu du produit */}
                              <Box
                                sx={{
                                  padding: '10px',
                                  backgroundColor: 'white',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Typography
                                  component="h2"
                                  sx={{
                                    fontSize: { md: '14px', xs: '12px' },
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {product.node.title}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    marginTop: '5px',
                                    fontSize: '12px',
                                    textDecoration: 'line-through',
                                  }}
                                >
                                  {currencySymbolSlider}{' '}
                                  {parseFloat(
                                    product?.node?.discount *
                                      currencySlider
                                  ).toFixed(2)}{' '}
                                </Typography>
                                <Typography
                                  variant="h3"
                                  sx={{
                                    fontSize: '16px',
                                    color: 'red',
                                    marginTop: '5px',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {currencySymbolSlider}{' '}
                                  {parseFloat(
                                    product?.node?.price * currencySlider
                                  ).toFixed(2)}{' '}
                                </Typography>
                                <Box
                                  sx={{
                                    backgroundColor: 'black',
                                    borderRadius: '10px',
                                    color: 'white',
                                    textAlign: 'center',
                                    marginTop: '10px',
                                    padding: '8px',
                                  }}
                                >
                                  <Link
                                    to={`/store/${product.node.link}/`}
                                    style={{ textDecoration: 'none' }}
                                  >
                                    <Typography
                                      variant="h4"
                                      sx={{ fontSize: '12px', color: 'white' }}
                                    >
                                      ORDER NOW
                                    </Typography>
                                  </Link>
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid
                          item
                          xs={12}
                          component="section"
                          md={12}
                          sx={{
                            mt: 2,
                            p: 2,
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <Typography
                            variant="h2"
                            sx={{
                              fontSize: '28px',
                              fontWeight: 'bold',
                              textTransform: 'uppercase',
                            }}
                          >
                            related products{' '}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          component="section"
                          md={12}
                          sx={{
                            mt: 2,
                            p: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            overflowX: { xs: 'auto', md: 'hidden' }, // Défilement horizontal sur mobile seulement
                            scrollSnapType: { xs: 'x mandatory', md: 'none' }, // Scrolling fluide sur mobile
                            gap: 2,
                            cursor: 'grab', // Indiquer une action glisser
                          }}
                          onMouseDown={(e) => {
                            const grid = e.currentTarget;
                            let startX = e.pageX - grid.offsetLeft;
                            let scrollLeft = grid.scrollLeft;

                            const onMouseMove = (e) => {
                              const x = e.pageX - grid.offsetLeft;
                              const walk = x - startX; // Distance de défilement
                              grid.scrollLeft = scrollLeft - walk;
                            };

                            const onMouseUp = () => {
                              grid.removeEventListener(
                                'mousemove',
                                onMouseMove
                              );
                              grid.removeEventListener('mouseup', onMouseUp);
                              grid.style.cursor = 'grab'; // Restaurer le curseur par défaut
                            };

                            grid.addEventListener('mousemove', onMouseMove);
                            grid.addEventListener('mouseup', onMouseUp);
                            grid.style.cursor = 'grabbing'; // Changer le curseur pour un effet actif
                          }}
                        >
                          {products.map((product, index) => (
                            <Box
                              key={index}
                              component="article"
                              sx={{
                                flex: { md: '0 0 15%', xs: '0 0 48%' }, // Augmenter la taille sur mobile pour afficher 2 produits par ligne
                                scrollSnapAlign: 'start', // Aligner les éléments au début du scroll
                                borderRadius: '10px',

                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                  transform: 'scale(1.05)', // Effet hover
                                },
                              }}
                            >
                              {/* Image du produit */}
                              <img
                                style={{
                                  width: '100%',
                                  height: '150px',
                                  objectFit: 'cover',
                                }}
                                src={
                                  product?.node?.image[0]?.file?.url
                                }
                                alt={product.node.title}
                                loading="lazy"
                              />
                              {/* Contenu du produit */}
                              <Box
                                sx={{
                                  padding: '10px',
                                  backgroundColor: 'white',
                                  display: 'flex',
                                  minHeight: '150px',
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Typography
                                  component="h2"
                                  sx={{
                                    fontSize: { md: '14px', xs: '12px' },
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {product.node.title}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    marginTop: '5px',
                                    fontSize: '12px',
                                    textDecoration: 'line-through',
                                  }}
                                >
                                  {currencySymbolSlider}{' '}
                                  {parseFloat(
                                    product?.node?.discount *
                                      currencySlider
                                  ).toFixed(2)}
                                </Typography>
                                <Typography
                                  variant="h3"
                                  sx={{
                                    fontSize: '16px',
                                    color: 'red',
                                    marginTop: '5px',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {currencySymbolSlider}{' '}
                                  {parseFloat(
                                    product?.node?.price * currencySlider
                                  ).toFixed(2)}
                                </Typography>
                                <Box
                                  sx={{
                                    backgroundColor: 'black',
                                    borderRadius: '10px',
                                    color: 'white',
                                    textAlign: 'center',
                                    marginTop: '10px',
                                    padding: '8px',
                                  }}
                                >
                                  <Link
                                    to={`/store/${product.node.link}/`}
                                    style={{ textDecoration: 'none' }}
                                  >
                                    <Typography
                                      variant="h4"
                                      sx={{ fontSize: '12px', color: 'white' }}
                                    >
                                      ORDER NOW
                                    </Typography>
                                  </Link>
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Grid>
                      </>
                    )}
                  </>
                )}
              </Grid>
            </>
          )}
        </>
      )}
    </Grid>
  );
};

export default FeaturedProducts;
