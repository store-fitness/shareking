// import {
//   Divider,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from '@mui/material';
// import { useStaticQuery, graphql } from 'gatsby';
// import React from 'react';

// const NewsSidebar = () => {
//   const data = useStaticQuery(graphql`
//     query {
//       blogs: allMarkdownRemark(
//         sort: { frontmatter: { date: DESC } }
//         filter: { frontmatter: { type: { eq: "blog" } } }
//         limit: 4
//       ) {
//         nodes {
//           frontmatter {
//             title
//             slug
//             date
//             description
//             thumb {
//               childImageSharp {
//                 gatsbyImageData(
//                   width: 600
//                   placeholder: BLURRED
//                   formats: [AUTO, WEBP, AVIF]
//                 )
//               }
//             }
//           }
//           id
//         }
//       }
//     }
//   `);
//   const news = data['blogs']?.nodes || [];

//   return (
//     <Grid
//       item
//       sx={{
//         display: { md: 'block', xs: 'none' },
//         position: 'sticky',
//         right: '20px',
//         top: '20%',
//         mt: 5,
//         p: 2,
//         backgroundColor: 'white',
//         borderRadius: '10px',
//         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
//       }}
//     >
//       <Typography
//         variant="h5"
//         component="h3"
//         sx={{
//           fontWeight: 'bold',
//           borderBottom: '2px solid #007bff',
//           paddingBottom: '10px',
//           marginBottom: '20px',
//         }}
//       >
//         News
//       </Typography>

//       <List>
//         {data.blogs.nodes.map((newsItem, index) => (
//           <React.Fragment key={index}>
//             <ListItem button>
//               <ListItemText primary={newsItem.frontmatter.title} />
//             </ListItem>
//             {index < data.blogs.nodes.length - 1 && <Divider />}
//           </React.Fragment>
//         ))}
//       </List>
//     </Grid>
//   );
// };

// export default NewsSidebar;
