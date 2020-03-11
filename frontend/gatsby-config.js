module.exports = {
  siteMetadata: {
    title: 'F1Hub',
    description: 'F1 portal displaying historical F1 data back to 1950',
    keywords: 'f1, formula1, formula 1, motorsport, motosport',
    author: {
      name: 'Michał Kozłowski',
      url: 'https://www.github.com/kozlovvski',
      email: 'michal@kozlovv.ski'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://f1hub.kozlovv.ski'
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
