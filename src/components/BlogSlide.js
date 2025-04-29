import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  useMediaQuery,
} from '@mui/material';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import JsonLdGenerator from './JsonLdGenerator';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

const BlogSlide = () => {
  const queryBlog = useStaticQuery(graphql`
    {
      logo: file(relativeDirectory: { eq: "hatspic/blog/logo" }) {
        childrenImageSharp {
          gatsbyImageData(
            width: 300
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      site: site {
        siteMetadata {
          title
          description
          siteUrl
          author
          authorSite
          language
          logo
        }
      }
      blogSlide: allContentfulFitnessforlifeBlog(
        sort: { createdAt: DESC }
        limit: 4
      ) {
        nodes {
          
            link
            title
            blogContent {
              raw
  }
            createdAt
            
            
           image {
        gatsbyImageData(width: 600, placeholder: BLURRED)
        title
        url
      }
          
        }
      }
    }
  `);

  const isDesktop = useMediaQuery('(min-width:600px)');
  const blogs = queryBlog?.blogSlide?.nodes || [];
  const logo = queryBlog?.logo?.childrenImageSharp[0].gatsbyImageData;
  const site = queryBlog?.site.siteMetadata;

  return (
    <Grid>
      {typeof window !== 'undefined' && (
        <>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', md: 'row-reverse' },
              alignItems: 'center',
              backgroundColor: 'whitesmoke',
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
                fontSize: { md: '25px', xs: '20px' },
                lineHeight: 1.5,
              }}
            >
              {window?.location.pathname == '/'
                ? 'BLOG WE HELP YOU TO CHOOSE YOUR BEST HAT'
                : window?.location.pathname.includes('blogs')
                ? 'RELATED BLOGS'
                : 'Your Complete Guide to Choose the Perfect Hat'}
            </Typography>
            <GatsbyImage
              style={{ width: isDesktop ? '120px' : '50%' }}
              image={getImage(logo)}
              alt="logo"
            />
          </Grid>

          {/* Carrousel fluide pour mobile */}
          <Grid
            item
            xs={12}
            component="section"
            md={12}
            sx={{
              mt: 2,
              p: 2,
              display: 'flex',
              flexDirection: { md: 'row', xs: 'row' },
              overflowX: { xs: 'auto', md: 'hidden' },
              scrollSnapType: 'x mandatory',
              gap: 2,
            }}
          >
            {blogs.map((blog, index) => {
              const imageTmp = blog.image.gatsbyImageData

              return (
                <Box
                  key={index}
                  sx={{
                    flex: { xs: '0 0 80%', md: '0 0 23%' },
                    scrollSnapAlign: 'start',
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: '10px',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                    component="article"
                  >
                    {imageTmp && (
                      <CardMedia>
                        <GatsbyImage
                          image={imageTmp}
                          alt={blog.title}
                          style={{ height: '200px', width: '100%' }}
                          loading="lazy"
                        />
                      </CardMedia>
                    )}
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '250px',
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '18px',
                          overflow: 'hidden',
                        }}
                      >
                        {blog.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          marginTop: '10px',
                          color: 'gray',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          fontSize: '16px',
                        }}
                      >
                        {  documentToPlainTextString(JSON.parse(blog.blogContent.raw))?.slice(0, 200)}...
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: 'black',
                          color: 'white',
                          p: 1,
                          borderRadius: '10px',
                          marginTop: '15px',
                          textAlign: 'center',
                        }}
                      >
                        <Link to={`/blogs/${blog.link}/`}>
                          <Typography
                            sx={{ color: 'white', fontWeight: 'bold' }}
                          >
                            READ MORE {blog.title.slice(0, 10)}...
                          </Typography>
                        </Link>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default BlogSlide;
