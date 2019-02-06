import { graphql, compose } from 'react-apollo';
import { USER_QUERY } from 'chatty/src/graphql/user.query';
import { GROUP_QUERY } from 'chatty/src/graphql/group.query';
import { connect } from 'react-redux';
import { withLoading } from 'chatty/src/components/withLoading';
import CHANGE_USERNAME from '../../../graphql/change-username.mutation';
import Settings from '../components/settings';

const userQuery = graphql(USER_QUERY, {
  options: ownProps => ({ variables: { id: ownProps.auth.id } }), // fake for now
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});

const changeUserName = graphql(CHANGE_USERNAME, {
  props: ({ mutate }) => ({
    changeUserName: (id, username) => mutate({
      variables: { id, username },
      refetchQueries: [
        {
          query: USER_QUERY,
          variables: {
            userId: id,
          },
        },
      ],
    }),
  }),
});

const mapStateToProps = ({ auth }) => ({
  auth,
});
export default compose(
  connect(mapStateToProps),
  withLoading,
  userQuery,
  changeUserName,
)(Settings);
