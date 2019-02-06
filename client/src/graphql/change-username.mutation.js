import gql from 'graphql-tag';

const CHANGE_USERNAME = gql`
  mutation changeUserName($id: Int!, $username: String!) {
    changeUserName(id: $id, username: $username) {
      id
      username
      jwt
    }
  }
`;

export default CHANGE_USERNAME;
