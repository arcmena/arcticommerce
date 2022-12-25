import { gql } from 'graphql-request'

const productsQuery = gql`
  {
    products(first: 5) {
      edges {
        node {
          id
          handle
          title
          description
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`

export { productsQuery }
