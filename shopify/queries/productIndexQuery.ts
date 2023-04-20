import { gql } from 'graphql-request'

const productIndexQuery = gql`
  {
    products(first: 100) {
      edges {
        node {
          id
          handle
          title
        }
      }
    }
  }
`

export { productIndexQuery }
