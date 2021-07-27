import { gql } from '@apollo/client';

export const FETCH_ME = gql`
  query Me {
    me {
      id
      firstname
      lastname
      emailAddress
      createdAt
      updatedAt
    }
  }
`;
