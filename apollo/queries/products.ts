import { gql } from '@apollo/client';

export const FETCH_PRODUCTS = gql`
  query Products(
    $first: Int
    $after: Binary
    $last: Int
    $before: Binary
    $filter: ProductsFilter
    $sort: ProductsSortInput
  ) {
    products(first: $first, after: $after, last: $last: before: $before, filter: $filter, sort: $sort) {
        edges {
            cursor
            node {
                ... on Product {
                    id
                    name
                    description
                }
            }
        }
        pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        }
    }
  }
`;
