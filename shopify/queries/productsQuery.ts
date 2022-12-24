import { gql } from 'graphql-request'

const productsQuery = gql`
  {
    products(first: 5) {
      edges {
        node {
          id
        }
      }
    }
  }
`
export { productsQuery }
