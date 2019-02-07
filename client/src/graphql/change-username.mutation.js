import gql from 'graphql-tag';

const CHANGE_USERNAME = gql`
  mutation changeUserMail($id: Int!, $username: String!) {
    changeUserName(id: $id, username: $username) {
      id
      username
      jwt
      email
    }
  }
`;

export default CHANGE_USERNAME;
