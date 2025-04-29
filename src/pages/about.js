import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/layout';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';

const About = ({ data }) => {
  const siteInfo = data?.siteInfo;
  const leftBoxRef = useRef(null);
  const [leftBoxHeight, setLeftBoxHeight] = useState('auto');

  useEffect(() => {
    // Met à jour la hauteur du conteneur vidéo pour qu'elle corresponde à la hauteur de la boîte about-fitness
    const updateHeight = () => {
      if (window.innerWidth >= 960 && leftBoxRef.current) {
        setLeftBoxHeight(leftBoxRef.current.offsetHeight);
      } else {
        setLeftBoxHeight('auto');
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Fitness For Life About US</title>
        <link rel="canonical" href={`${siteInfo.siteMetadata.siteUrl}/about`} />
        <html lang="en" />
        <meta
          name="description"
          content="Fitness For Life STORE, is a lifestyle brand that offers a wide range of products and accessories to help you stay active, healthy, and stylish. Our products are designed to be versatile and functional, making them perfect for everyday use."
        />
        <meta
          name="keywords"
          content="fitness, for life, STORE, blogs,hats trends ,trucker hats,hats for men, hats for women"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={siteInfo.siteMetadata.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            justifyContent: 'space-between',
            height: { md: '450px', xs: 'auto' },
            alignItems: { xs: 'center', md: 'stretch' }, // Alignement vertical pour garantir la même hauteur
            gap: 4,
          }}
        >
          {/* Section de gauche : Image et texte */}
          <Box
            id="about-fitness-for-life"
            sx={{
              width: { md: '50%', xs: '80%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              p: 3,
              backgroundColor: '#fff',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              flex: 1, // Permet de prendre la même hauteur que l'autre box
            }}
          >
            {/* Image */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '200px',
                overflow: 'hidden',
                borderRadius: '10px',
              }}
            >
              <GatsbyImage
                image={getImage(data.logo.childrenImageSharp[0])}
                alt="Fitness For Life Logo"
                style={{ width: '50%', height: '100%', objectFit: 'fill' }}
              />
            </Box>

            {/* Titre */}
            <Typography
              variant="h1"
              component="h1"
              sx={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }}
            >
              Fitness is not just a hobby, it’s a lifestyle.
            </Typography>

            {/* Description */}
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontSize: '18px', lineHeight: 1.6, textAlign: 'justify' }}
            >
              That has been the driving philosophy for{' '}
              <strong>over 15 years</strong> and has got me into the best shape
              of my life. It has also helped me train professional football
              players, athletes and boxers to help them stay at the top of their
              game. Working with these exceptional professionals, and this life
              changing belief, inspired me to create the Fitness For Life
              factory sportswear collection to help others achieve their best
              results.
            </Typography>
          </Box>

          {/* Section de droite : Vidéo */}
          <Box
            id="about-fitness-for-life-video"
            sx={{
              width: { md: '45%', xs: '100%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff', // Pour ressembler à la box gauche
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              flex: 1, // Même hauteur que la box gauche
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://firebasestorage.googleapis.com/v0/b/backend-test-6750b.appspot.com/o/fitnessforlife_store_reel_09_10_2024_12_59_223475023360800587239.mp4?alt=media&token=07475085-ff7d-4399-bc5d-e4237a08880f"
              style={{
                width: '100%',
                height: '100%', // Remplir la hauteur disponible
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            p: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              p: 3,
              width: { md: '100%', xs: '80%' },
              backgroundColor: '#fff',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Typography
                variant="h2"
                sx={{ fontSize: '28px', fontWeight: 'bold' }}
              >
                Warren Chebby
              </Typography>
              <GatsbyImage
                image={getImage(data.woWeAre.nodes[0].childrenImageSharp[0])}
                alt="Fitness For Life Logo"
                style={{
                  borderRadius: '20px',
                  width: '30%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Typography
              variant="h3"
              align="justify"
              sx={{
                width: '100%',
                lineHeight: '1.5',
                fontSize: '18px',
                fontWeight: '',
              }}
            >
              <strong>Warren Chebby</strong> is a highly respected and
              inspirational personal trainer who has been working with
              exceptional professionals. Over the years he has trained
              professional football players athletes and boxers to help them
              stay at the top of their game.
              <br /> It was this life changing belief that inspired him to
              create the Fitness For Life factory; to help others achieve their
              best results. "Training for me is a lifestyle and something I am
              extremely passionate about. I am never happier than when I am
              boxing, weightlifting, running or playing football. This has given
              me the immense satisfaction of being able to inspire those at the
              top of their game to get into peak physical condition and achieve
              their goals." In 2016 he joined forces with an experienced
              business partner Dennis Otim, and together they launched a new{' '}
              <strong>Fitness for Life Factory</strong> sports wear collection,
              which has been successfully growing in both the UK and
              internationally.
              <br /> In 2017 we launched Fitness for life sport, designing
              exclusive football kits, bibs, training kits, tracksuits, jackets
              and accessories for clubs around the world.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            justifyContent: 'center',
            mt: 2,
            mb: 2,
            height: { md: '300px', xs: 'auto' },
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: { md: '50%', xs: '80%' },
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              p: 3,

              backgroundImage: `linear-gradient(
                rgba(255, 255, 255, 0.7), 
                rgba(255, 255, 255, 0.7)
              ), url(${data.backgroundImage.nodes[0].childrenImageSharp[0].gatsbyImageData.images.fallback.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontSize: '28px', fontWeight: 'bold' }}
            >
              About the Fitness For Life factory sportswear collection
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: '1.5', fontSize: '18px', fontWeight: '' }}
            >
              We believe that fitness does not only come from having a good work
              out space or great equipment. Those are essential of course but
              what you wear is equally important. You need to be comfortable
              with what you have on to get the best work out and achieve your
              goals - whether on the track, gym, or a football field.
              <br /> This has been our company philosophy as we always aim to
              provide our customers good quality, supportive and comfortable
              sportswear or football kits to help them achieve the best
              performance and results.
            </Typography>
          </Box>
          <Box
            sx={{
              width: { md: '50%', xs: '80%' },
              display: 'flex',
              height: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              p: 3,
              backgroundColor: '#fff',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              backgroundImage: `linear-gradient(
                rgba(255, 255, 255, 0.7), 
                rgba(255, 255, 255, 0.7)
              ), url(${data.yellowbackground.nodes[0].childrenImageSharp[0].gatsbyImageData.images.fallback.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontSize: '28px', fontWeight: 'bold' }}
            >
              Why Choose Us
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: '1.5', fontSize: '18px', fontWeight: '' }}
            >
              At Fitness For Life, the customer is the center of everything we
              do. We're committed to making your shopping experience with us
              smooth from start to finish. Our website is designed to make it as
              easy as possible for you to navigate and view our products with
              ease. Every purchase is safeguarded by our secure method of
              payment for safety and security. And with fast and reliable
              shipping, that perfect cap is only a click away from your
              doorstep.
            </Typography>{' '}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              p: 3,
              width: { md: '80%', xs: '80%' },
              backgroundColor: '#fff',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontSize: '28px', fontWeight: 'bold' }}
            >
              Our Promise
            </Typography>
            <Typography
              variant="h3"
              sx={{ lineHeight: '1.5', fontSize: '18px', fontWeight: '' }}
            >
              More than the product, we are committed to bonding with our
              customers through unparalleled quality and service. Every cap in
              our inventory is handpicked and rigorously tested to make sure it
              lives up to our high standards. We value your trust and work every
              day to find better ways to serve you
            </Typography>
            <GatsbyImage
              image={getImage(
                data.logoInitial.nodes[0].childrenImageSharp[0].gatsbyImageData
              )}
              alt="Fitness For Life Logo"
              style={{
                borderRadius: '10px',
                width: '25%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default About;

export const query = graphql`
  query logoAbout {
    logo: file(relativeDirectory: { eq: "hatspic/store" }) {
      childrenImageSharp {
        gatsbyImageData(
          width: 300
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
    woWeAre: allFile(
      filter: { relativePath: { eq: "hatspic/about/about-logo.webp" } }
    ) {
      nodes {
        childrenImageSharp {
          gatsbyImageData(
            width: 300
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
    backgroundImage: allFile(
      filter: {
        relativePath: { eq: "hatspic/product/white-trucker-cap/logo/logo.webp" }
      }
    ) {
      nodes {
        childrenImageSharp {
          gatsbyImageData(
            width: 300
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
    yellowbackground: allFile(
      filter: {
        relativePath: {
          eq: "hatspic/product/yellow-trucker-cap/logo/logo.webp"
        }
      }
    ) {
      nodes {
        childrenImageSharp {
          gatsbyImageData(
            width: 300
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
    logoInitial: allFile(
      filter: { relativePath: { eq: "hatspic/logo.webp" } }
    ) {
      nodes {
        childrenImageSharp {
          gatsbyImageData(
            width: 300
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
    siteInfo: site {
      siteMetadata {
        title
        description
        siteUrl
        author
      }
    }
  }
`;
