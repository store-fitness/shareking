/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: 'FITNESS FOR LIFE | Best Trucker Hats, 10% Off & Free Shipping',
    language: 'en',
    author: 'MoreTech',
    authorSite: 'https://www.moretech.ma',
    logo: '/logo/logo.webp',
    description:
      'Fitness For Life STORE, is a lifestyle brand that offers a wide range of products and accessories to help you stay active, healthy, and stylish. Our products are designed to be versatile and functional, making them perfect for everyday use.',
    siteUrl: 'https://fitnessforlifehats.com',
    keywords:
      'fitness or life Shop,fitness or life hats, FFL shop, STORE, blogs,hats trends ,trucker hats,hats for men, hats for women',
    social: [
      {
        name: 'instagram',
        url: 'https://www.instagram.com/fitnessforlife_store/',
      },
      {
        name: 'whatsapp',
        url: 'https://wa.me/447307410512/',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-image',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `oryvc4ww6bdc`,
        accessToken: `OEx9uPqb2BtbuZJKkGM7mBX7ic7yevYwUQewJXYSOz8`,
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    `gatsby-plugin-prettier-build`,
    `gatsby-plugin-react-helmet`,
    'gatsby-transformer-sharp',
    `gatsby-transformer-remark`,

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/hatspic/logo.webp',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              withWebp: true,
            },
          },
        ],
      },
    },

   
   

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
      __key: 'images',
    },
  ],
};
