module.exports = {
  siteMetadata: {
    title: `NoFWL`,
    description: `No free working life`,
    author: `lencx`,
    social: {
      twitter: `lencx`
    }
  },
  pathPrefix: '/',
  plugins: [
    // SEO
    `gatsby-plugin-react-helmet`,
    { // markdown -> html
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              // inlineCodeMarker: '±',
              classPrefix: 'nfwl-language-'
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
            },
          },
        ],
      },
    },
    { // blog-post
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `blog`,
      },
    },
    { // blog-assets
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `NoFWL`,
        short_name: `nofwl`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `pink`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/assets/nofwl.png`, // This path is relative to the root of the site.
      },
    },
    { // dart-sass
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass'),
      },
    },
    { // i18n
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'en',
        useLangKeyLayout: false,
        pagesPaths: [`/content/posts`]
      },
    },
    `gatsby-plugin-catch-links`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
