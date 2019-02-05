import { graphql } from 'react-apollo';

import { DELETE_FRIEND_MUTATION } from 'chatty/src/graphql/delete-friend.mutation';
import { USER_QUERY } from 'chatty/src/graphql/user.query';
import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const deleteFriendMutation = graphql(DELETE_FRIEND_MUTATION, {
  props: ({ mutate, ownProps }) => ({
    makeAction: to => mutate({
      variables: { to, from: ownProps.auth.id },
      refetchQueries: [
        {
          query: USER_QUERY,
          variables: {
            id: ownProps.auth.id,
          },
        },
      ],
    }),
  }),
});

export default ActionComponent => connect(mapStateToProps)(deleteFriendMutation(ActionComponent));
