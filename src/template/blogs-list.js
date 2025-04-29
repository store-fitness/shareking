import React from 'react';
import Layout from '../components/layout';
import { graphql, Link } from 'gatsby';
import { Box, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';
import '../styles/cardContainer.css';
import FeaturedProducts from '../components/FeaturedProducts';
import { currencyList } from '../components/variableStatic';
import JsonLdGenerator from '../components/JsonLdGenerator';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
const BlogList = ({ data, pageContext }) => {
   const [currency, setCurrency] = React.useState(currencyList[2]);
  const isDesktop = useMediaQuery('(min-width:600px)');
  const blogs = data.blogsData.nodes;
  const siteInfo = data.siteInfo;
  const slideLogo = data?.logo?.childrenImageSharp[0]?.gatsbyImageData;

  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const totalBlogs = data.blogsData.totalCount;

  const prevPage =
    currentPage - 1 === 1 ? '/blogs' : `/blogs/${currentPage - 1}`;
  const nextPage = `/blogs/${currentPage + 1}`;
  const pageData = {
    title: 'Fitness For Life Hats blogs',
    description:
      'Fitness For life Hats FFL: Best Hats Collection for men and women, 10% off and free shipping\n get answers from our experts for all your questions',
    siteUrl: `${siteInfo.siteMetadata.siteUrl}/blogs`,
    logo: `${siteInfo.siteMetadata.logo}`,
    author: `${siteInfo.siteMetadata.author}`,
  };
  return (
    <Layout>
      <JsonLdGenerator site={pageData} type="WebSite" />
      <JsonLdGenerator
        site={siteInfo.siteMetadata}
        product={blogs}
        currentPage={currentPage}
        totalBlogs={totalBlogs}
        type="blog"
      />
      <Helmet>
        <title>Fitness For Life Blogs</title>
        <link
          rel="canonical"
          href={`${siteInfo.siteMetadata.siteUrl}/blogs${
            !isFirst ? `/${currentPage}` : ''
          }`}
        />
        <html lang="en" />
        <meta
          name="description"
          content="Fitness For Life Blogs, is a lifestyle brand that offers a wide range of products and accessories to help you stay active, healthy, and stylish. Our products are designed to be versatile and functional, making them perfect for everyday use."
        />
        <meta
          name="keywords"
          content="fitness, for life, blog, blogs,hats trends ,trucker hats,hats for men, hats for women"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={siteInfo.siteMetadata.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
        }}
      >
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
                FFL Blogs
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
        <Grid item xs={12} md={10}>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              mt: 5,
            }}
          >
            {blogs?.map((blog,index) => {
              return (
                <Box
                  key={index}
                  component="article"
                  className="cardModel"
                  id={blog?.title}
                >
                  <Box id="description">
                    <Typography
                      component="h2"
                      variant="h2"
                      gutterBottom
                      align="center"
                      sx={{ fontSize: '20px', fontWeight: 'bold' }}
                    >
                      {blog?.title}
                    </Typography>

                    <Typography variant="h3" gutterBottom align="justify">
                      {documentToPlainTextString(JSON.parse(blog?.blogContent?.raw))?.slice(0, 200)}...
                      
                    </Typography>

                    <Link
                      to={`/blogs/${blog?.link}`}
                      title={`Read full blog: ${blog?.title}`}
                      aria-label={`Read full blog: ${blog?.title}`}
                    >
                      <span>
                        Read More about {blog?.title.slice(0, 10)}...
                      </span>
                    </Link>
                  </Box>
                  <Divider orientation="vertical" flexItem variant="middle" />
                  <Box component="figure">
                    <GatsbyImage
                      loading="lazy"
                      image={blog?.image?.gatsbyImageData
                      }
                      alt={`${blog?.title}`}
                    />
                  </Box>
                </Box>
              );
            })}
          </Grid>

          {/* Pagination Controls */}
          <Grid className="pagination" id="pagination">
            {!isFirst && (
              <Link
                to={prevPage}
                rel="prev"
                title="Go to the previous blogs page"
              >
                ← Previous Blogs
              </Link>
            )}

            {!isLast && (
              <Link to={nextPage} rel="next" title="Go to the next blogs page">
                More Blogs →
              </Link>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            mt: { md: 1, xs: 0 },
            p: '8px 0px 8px 0px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(250, 250, 250, 0.5)',

            backgroundColor: 'whitesmoke',
          }}
        >
          <Box
            sx={{
              p: 4,
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              align="center"
              variant="h2"
              sx={{ fontSize: '18px', fontWeight: 'bold' }}
            >
              Get 10% off on all our Collection
            </Typography>
          </Box>

          <FeaturedProducts
            currencySlider={currency?.rate}
            currencySymbolSlider={currency?.symbol}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default BlogList;

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    blogsData: allContentfulFitnessforlifeBlog(
      sort: { createdAt: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      nodes {
        id
        title
        blogContent {
          raw
        }
        link
        createdAt 
        image {
          gatsbyImageData(
            width: 600
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
          title
          url
        }
      }
    }
    siteInfo: site {
      siteMetadata {
        title
        description
        siteUrl
        authorSite
        language
        logo
        author
      }
    }
    logo: file(relativePath: { eq: "hatspic/store/logo.webp" }) {
      childrenImageSharp {
        gatsbyImageData(
          width: 600
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`;
