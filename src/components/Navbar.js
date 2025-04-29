// src/components/Navbar.js

import React, { useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Drawer,
  IconButton,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import ContactBar from './ContactBar';
import JsonLdGenerator from './JsonLdGenerator';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width:600px)');

  const data = useStaticQuery(graphql`
    query getlogo {
      site: site {
        siteMetadata {
          title
          authorSite
          description
          siteUrl
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
    }
  `);
  const logo = data.logo.childrenImageSharp[0].gatsbyImageData;
  const site = data.site.siteMetadata;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };
  const menuItems = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'STORE',
      link: '/store',
    },
    {
      name: 'REVIEWS',
      link: '/reviews',
    },
    {
      name: 'BLOGS',
      link: '/blogs',
    },
    {
      name: 'ABOUT',
      link: '/about',
    },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'black',
          boxShadow: '0px 5px 20px rgba(100, 100,255, 0.3)',
          marginTop: '10px',
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                width: { md: '20%', xs: '20%' },
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '10%',
              }}
            >
              <Link to="/">
                <GatsbyImage
                  style={{ width: isDesktop ? '100px' : '50px' }}
                  image={getImage(logo)}
                  alt="Fitness for life logo"
                />
              </Link>
            </Box>

            <JsonLdGenerator
              product={menuItems}
              site={site}
              type="BreadcrumbList"
            />

            <Box
              sx={{
                width: '60%',
                display: { md: 'flex', xs: 'none' },
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              {menuItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    sx={{
                      my: 2,
                      fontWeight: '550',

                      fontSize: '18px',
                    }}
                    component={Link}
                    to={item.link}
                    variant="text"
                    color="inherit"
                  >
                    {item.name}
                  </Button>
                  {index < menuItems.length - 1 && (
                    <Divider
                      variant="middle"
                      orientation="horizontal"
                      sx={{
                        opacity: '0.4',
                        height: '40%',
                        width: '1.5px',
                        backgroundColor: 'GrayText',
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
            <Box sx={{ width: { md: '20%', xs: '40%' } }}>
              <ContactBar />
            </Box>
            <Box sx={{ display: { md: 'none', xs: 'block' }, width: '15%' }}>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: 'white',
                  boxShadow: '0px 0px 10px rgba(255,255, 255, 0.7)',
                  borderRadius: '30%',
                  width: '40px',
                  height: '40px',
                }}
              >
                <Typography sx={{ fontSize: '20px' }}>≡</Typography>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          '.MuiDrawer-paper': {
            width: '80%',

            height: 'auto',
            p: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: 'black',
            borderRadius: '10px 0px 0px 10px',
            mt: 7,
            transition: 'transform 0.3s ease-in-out',
          },
        }}
      >
        <Box
          role="presentation"
          onClick={handleCloseDrawer}
          onKeyDown={handleCloseDrawer}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '30%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '10%',
            }}
          >
            <GatsbyImage
              style={{ width: '60px', borderRadius: '10%' }}
              image={getImage(logo)}
              alt="logo"
            />
          </Box>
          <Box
            sx={{
              width: '70%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItem: 'center',
            }}
          >
            {menuItems.map((item, index) => (
              <Box
                key={item.name}
                sx={{
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  borderBottomRightRadius: '30px',

                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  component={Link}
                  to={item.link}
                  sx={{
                    display: 'block',
                    color: 'inherit',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  {item.name}
                </Button>
                <Divider
                  orientation="vertical"
                  sx={{
                    opacity: '0.2',
                    height: '2px',
                    width: '100%',
                    backgroundColor: 'GrayText',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
// export const query = graphql`
//   query getlogo {
//     file(relativeDirectory: { eq: "hatspic" }) {
//       childrenImageSharp {
//         gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
//       }
//     }
//   }
// `;
