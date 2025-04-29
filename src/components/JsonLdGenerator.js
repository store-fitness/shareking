import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { getSrc } from 'gatsby-plugin-image';
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';

const JsonLdGenerator = ({ site, product, type, currentPage, totalBlogs }) => {
  // Utilisation de useMemo pour mémoïser le JSON-LD
  const jsonLdScript = useMemo(() => {
    if (type == 'BreadcrumbList') {
      return `
      {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
   "itemListElement": [
    ${product
      ?.map(
        (item, index) =>
          `
    {
      "@type": "ListItem",
      "position": "${index + 1}",
      "name": "${item?.name}",
      "item": "${site?.siteUrl}${item?.link}"
    }
   
    `
      )
      .join(',')}]
    }
      `;
    }
    if (type === 'ItemList') {
      return `
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": [
            ${product
              .map(
                (item, index) => `
                  {
                    "@type": "ListItem",
                    "position": ${index + 1},
                    "item": {
                      "@type": "Product",
                      "name": "${item?.frontmatter.title}",
                      "description": "${item?.frontmatter.description || ''}",
                      "image": "${site?.siteUrl}${
                  getSrc(
                    item?.frontmatter?.thumb?.childImageSharp?.gatsbyImageData
                  ) || ''
                }",
                

                "review": [
                        {
                          "@type": "Review",
                          "author": "Jean Dupont",
                          "datePublished": "2024-12-01",
                          "reviewBody": "Produit de qualité exceptionnelle, très satisfait.",
                          "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "5"
                          }
                          
                        }
                      ],
                      "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.5",
                        "reviewCount": "123"
                      },
                      "sku": "${item?.frontmatter.slug || ''}",
                      "brand": { "@type": "Brand", "name": "${
                        site?.title || ''
                      }" },
                       
                      "offers": {
                        "@type": "Offer",
                        "itemOffered": {
                        "@type": "service",
                        "name": "10% off and free Shipping",
                        "description": "10% off and free Shipping",
                        "url": "${site?.siteUrl || ''}/store/${
                  item?.frontmatter.slug
                }"},
                        "url": "${site?.siteUrl || ''}/store/${
                  item?.frontmatter.slug || ''
                }",
                        "priceCurrency": "GBP",
                        "price": "${parseFloat(
                          item?.frontmatter.price || 0
                        ).toFixed(2)}",
                        "priceValidUntil": "2025-12-31",
                        "itemCondition": "https://schema.org/NewCondition",
                        "availability": "https://schema.org/InStock"
                      }
                    }
                  }
                `
              )
              .join(',')}
          ]
        }
      `;
    }
    if (type == 'WebSite') {
      return `
    
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "${site?.title}",
  "url": "${site?.siteUrl}",
  "description": "${site?.description}",
  "publisher": {
    "@type": "Organization",
    "name": "${site.author}",
    "logo": "${site.siteUrl}${site.logo}"
  }
 
}

      `;
    }
    if (type == 'BlogPosting') {
      return `
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        ${product
          ?.map(
            (blog, index) => `
          {
            "@type": "ListItem",
            "position": ${index + 1},
            "name":"${blog?.frontmatter?.title}",
            "item": {
              "@type": "BlogPosting",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${site?.siteUrl}/blogs/${blog?.frontmatter?.slug}"
              },
              "headline": "${blog?.frontmatter?.title}",
              "description": "${blog?.frontmatter?.description}",
              "image": "${site?.siteUrl}${
              getSrc(
                blog?.frontmatter?.thumb?.childImageSharp?.gatsbyImageData
              ) || ''
            }",
              "author": {
                "@type": "Person",
                "name": "${site?.authorSite}"
              },
              "publisher": {
                "@type": "Organization",
                "name": "${site?.authorSite}",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${site?.siteUrl}${site?.logo}"
                }
              },
              "datePublished": "${blog?.frontmatter?.date || ''}",
              "dateModified": "${blog?.frontmatter?.date || ''}"
             
            }
          }
        `
          )
          .join(',')}
      ]
    }
  `;
    }

    if (type === 'blog') {
      const totalPages = Math.ceil(totalBlogs / 10); // Calculer le nombre total de pages

      return `
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        "url": "${site?.siteUrl}/blogs${
        currentPage > 1 ? '/' + currentPage : ''
      }",
        "name": "Fiteness For Life Blogs",
        "description": "Fitness For life Hats FFL: Best Hats Collection for men and women, 10% off and free shipping\n get answers from our experts for all your questions",
        "publisher": {
          "@type": "Organization",
          "name": "${site?.author}",
          "logo": {
            "@type": "ImageObject",
            "url": "${site?.siteUrl}${site?.logo}"
          }
        },
        "blogPost": [
          ${product
            ?.map(
              (blog) => `
              {
                "@type": "BlogPosting",
                "headline": "${blog?.title}",
                "inLanguage": "${site?.language}",
                "url": "${site?.siteUrl}/blogs/${blog?.link}",
                "description": "${documentToPlainTextString(JSON.parse(blog?.blogContent?.raw))?.slice(0, 200) || ''}",
                "image": "${site?.siteUrl}${
                getSrc(
                  blog?.image?.gatsbyImageData
                ) || ''
              }",
                "datePublished": "${blog?.createdAt || ''}",
                "dateModified": "${new Date().toISOString() || ''}",
                "author": {
                  "@type": "Person",
                  "name": "${site?.author}"
                },
                  "publisher": {
                    "@type": "Organization",
                    "name": "${site?.author}",
                    "logo":{
          "@type": "ImageObject",
          "url": "${site?.siteUrl}${site?.logo}"
        }
                  },
                  "mainEntityOfPage": "${site?.siteUrl}/blogs/${
                blog?.link
              }/"
              }
              `
            )
            .join(',')}
        ]
        
      }
      `;
    }

    if (type === 'Review') {
      return `
      {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "breadcrumb": "${site?.siteUrl}/reviews",
  "mainEntity": {
    "@type": "Product",
    "name": "Fitness For Life Shop",
    "description": "${site?.description}",
    "image": "${site?.siteUrl}${site?.logo}",
    "sku": "1Ak6789",
    "brand": {
      "@type": "Brand",
      "name": "Fitness For Life"
    
    },
   
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2025-12-31",
      "price": "24.99",
      "priceCurrency": "GPB",
      "url": "${site?.siteUrl}/store",
       "itemOffered": {
      "@type": "service",
      "name": "Get 10% off and free shipping worldwide",
      "description": "Get 10% off and free shipping worldwide"
      
    }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "323"
    },
    "review": [
      ${product
        .map(
          (review) => `
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "${review?.frontmatter?.name}"
          },
          "datePublished": "${new Date().toISOString()}",
          "name": "Product Review",
          "reviewBody": "${review?.frontmatter?.commentaire}",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "${review?.frontmatter?.notation}",
            "bestRating": "5",
            "worstRating": "1"
          }
        }
      `
        )
        .join(',')}
    ]
  }
}
      `;
    }

    if (type == 'Product') {
      return `
      {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "${product?.title}",
  "description": "${product?.description}",
  "url": "${site?.siteUrl}/store/${product?.slug}",
 
  "mainEntity": {
    "@type": "Product",
    "name": "${product?.title}",
    "description": "${product?.description}",
   
    "image": "${site?.siteUrl}${getSrc(
        product?.thumb?.childImageSharp?.gatsbyImageData
      )}",
    "sku": "A1IPTV",
    "brand": {
      "@type": "Brand",
      "name": "${site?.title}"
    },
    "offers": {
      "@type": "Offer",
      "url": "${site?.siteUrl}/store/${product?.slug}",
      "priceCurrency": "GBP",
    
      "price": "${parseFloat(product?.price).toFixed(2)}",
      "priceValidUntil": "2025-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "itemOffered": {
      "@type": "service",
      "name": "10% off and free Shipping",
      "description": "Get 10% off and free shipping on all our Fitness For Life Hats | FFL Shop is the best hats collection for men and women.",
      "url": "${site?.siteUrl}/store/${product?.slug}"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "45"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Jean Dupont"
        },
        "datePublished": "2024-12-01",
        "name": "product review",
        "reviewBody": "Best hats quality and variety ! Very satisfied .",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Marie Curie"
        },
        "datePublished": "2024-12-03",
        "name": "Product review",
        "reviewBody": "I got my 10% off coupon and free shipping on my first purchase. I highly recommend it.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4.6",
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    ]
  }
}

      `;
    }
    if (type == 'article') {
      let html  = documentToPlainTextString(JSON.parse(product?.blog?.blogContent?.raw));
      let tempHtml = '';
      if (typeof window !== 'undefined') {
        tempHtml = document?.createElement('div');
        tempHtml.innerHTML = html;
      }

      const image = getSrc(
        product?.blog?.image?.gatsbyImageData
      );

      const { title, createdAt , link } =
        product?.blog;
      const imageName = product?.blog?.image?.title;
      const description = documentToPlainTextString(JSON.parse(product?.blog?.blogContent?.raw))?.slice(0, 200);
      return `
      {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "${title}",
  "description": "${description}",
  "url": "${site?.siteUrl}/blogs/${link}/",
  
  "mainEntity": {
    "@type": "BlogPosting",
    "headline": "${title}",
    "description": "${description}",
    "image": "${site?.siteUrl}${image}",
    "author": {
      "@type": "organization",
      "name": "${site?.authorSite}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "${site?.siteUrl}",
      "logo": {
        "@type": "ImageObject",
        "url": "${site?.siteUrl}${site?.logo}"
      }
    },
    "datePublished": "${createdAt}",
    "dateModified": "${new Date().toISOString()}",
    "articleBody": "${tempHtml?.innerText}",
    "inLanguage": "${site?.language}",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${site?.siteUrl}/blogs/${link}"
    }
  }
}

      `;
    }
    return null;
  }, [type, site, product]);

  return (
    <>
      {jsonLdScript && (
        <Helmet>
          <script type="application/ld+json">{jsonLdScript}</script>
        </Helmet>
      )}
    </>
  );
};

export default JsonLdGenerator;
