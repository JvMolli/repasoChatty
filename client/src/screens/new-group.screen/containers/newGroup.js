import { graphql, compose } from 'react-apollo';
import { USER_QUERY } from 'chatty/src/graphql/user.query';
import { connect } from 'react-redux';

import { withLoading } from 'chatty/src/components/withLoading';
import NewGroup from '../components/newGroup';

const userQuery = graphql(USER_QUERY, {
  options: ownProps => ({ variables: { id: ownProps.auth.id } }), // fake for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});

const mapStateToProps = ({ auth }) => ({
  auth,
});
export default compose(
  connect(mapStateToProps),
  withLoading,
  userQuery,
)(NewGroup);
