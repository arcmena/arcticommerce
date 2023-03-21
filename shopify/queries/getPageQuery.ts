import { gql } from 'graphql-request'

const pageQuery = gql`
  query pageQuery($handle: String!) {
    page(handle: $handle) {
      id
      handle
      body
      seo {
        title
        description
      }
    }
  }
`

export { pageQuery }
