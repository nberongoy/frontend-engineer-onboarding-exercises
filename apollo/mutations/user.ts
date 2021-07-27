import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
    }
  }
`;

export const AUTHENTICATE = gql`
  mutation Authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      token
    }
  }
`;
