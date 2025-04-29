import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

const ServiceSection = ({ title, description, schemaData }) => (
  <section style={{ backgroundColor: 'white', padding: '16px' }}>
    <meta content={title} />
    <Box>
      <Typography
        variant="h3"
        sx={{ fontSize: '20px', fontWeight: 'bold', color: 'gray' }}
      >
        {title}
      </Typography>
      <Typography component="p" sx={{ fontSize: '16px', lineHeight: '1.5' }}>
        {description}
      </Typography>
    </Box>
    <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
  </section>
);

const Offre = () => {
  const queryData = useStaticQuery(graphql`
    {
      logo: file(relativePath: { eq: "hatspic/logo/offer-slide-logo.webp" }) {
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

  const logo = queryData.logo.childrenImageSharp[0].gatsbyImageData;
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <Grid sx={{ mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'white',
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
            p: 1,
            color: 'black',
            textTransform: 'uppercase',
            fontSize: '25px',
          }}
        >
          WE OFFER FOR YOU
        </Typography>

        <GatsbyImage
          style={{ width: isDesktop ? '120px' : '50%' }}
          image={getImage(logo)}
          alt="Offer Logo"
        />
      </Box>
      <Grid
        component="section"
        sx={{
          backgroundColor: 'white',
          padding: '8px',
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
        }}
      >
        <ServiceSection
          title="Worldwide Shipping"
          description="We ship globally! Get your fitness essentials delivered securely and swiftly to your doorstep, wherever you are. Start your journey today!"
          schemaData={{
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Worldwide Shipping',
            serviceType: 'Global Shipping Service',
            areaServed: {
              '@type': 'GeoCircle',
              geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: 54.633221,
                longitude: -3.4322774,
              },
              geoRadius: 450000,
            },
            description:
              'We ship globally! Get your fitness essentials delivered securely and swiftly to your doorstep, wherever you are.',
            provider: { '@type': 'Organization', name: 'Hats and Caps Store' },
          }}
        />

        <ServiceSection
          title="Best Quality"
          description="Crafted with precision, our products are made from premium materials to ensure durability and peak performance. Only the best for your fitness journey!"
          schemaData={{
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Best Quality Fitness for life Hats Shop',
            serviceType: 'Premium Hats and Caps',
            areaServed: {
              '@type': 'GeoCircle',
              geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: 54.633221,
                longitude: -3.4322774,
              },
              geoRadius: 450000,
            },
            description:
              'Crafted with precision, our products are made from premium materials to ensure durability and peak performance.',
            provider: {
              '@type': 'Organization',
              name: 'Fitness for life Hats and Caps Store',
            },
          }}
        />

        <ServiceSection
          title="Best Offers Fitness for life Hats Shop"
          description="Enjoy unbeatable deals on top-quality hats and caps! Get the best value for your money with our exclusive discounts and special offers."
          schemaData={{
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Best Offers Fitness for life Hats Shop',
            serviceType: 'Exclusive Discounts on Hats',
            areaServed: {
              '@type': 'GeoCircle',
              geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: 54.633221,
                longitude: -3.4322774,
              },
              geoRadius: 450000,
            },
            description:
              'Enjoy unbeatable deals on top-quality hats and caps! Get the best value for your money with our exclusive discounts and special offers.',
            provider: {
              '@type': 'Organization',
              name: 'Fitness for life Hats and Caps Store',
            },
          }}
        />

        <ServiceSection
          title="Secure Payments"
          description="Shop with confidence! Our payment system is fully encrypted, ensuring that your personal and financial information is safe and secure at every step."
          schemaData={{
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Secure Payments',
            serviceType: 'Encrypted Payment Processing',
            areaServed: {
              '@type': 'GeoCircle',
              geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: 54.633221,
                longitude: -3.4322774,
              },
              geoRadius: 450000,
            },
            description:
              'Shop with confidence! Our payment system is fully encrypted, ensuring that your personal and financial information is safe and secure at every step.',
            provider: {
              '@type': 'Organization',
              name: 'Fitness for life Hats and Caps Store',
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Offre;
