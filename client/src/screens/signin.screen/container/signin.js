import { NavigationActions } from 'react-navigation';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import Signin from '../components/signin';
import LOGIN_MUTATION from '../../../graphql/login.mutation';
import SIGNUP_MUTATION from '../../../graphql/signup.mutation';

const login = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    login: ({ email, password }) => mutate({
      variables: { email, password },
    }),
  }),
});

const signup = graphql(SIGNUP_MUTATION, {
  props: ({ mutate }) => ({
    signup: ({ email, password }) => mutate({
      variables: { email, password },
    }),
  }),
});
const mapStateToProps = ({ auth }) => ({
  auth,
});

export default compose(
  login,
  signup,
  connect(mapStateToProps),
)(Signin);
