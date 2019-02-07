import gql from 'graphql-tag';

const CHANGE_USERMAIL = gql`
  mutation changeUserMail($id: Int!, $email: String!) {
    changeUserMail(id: $id, email: $email) {
      id
      username
      jwt
      email
    }
  }
`;

export default CHANGE_USERMAIL;
