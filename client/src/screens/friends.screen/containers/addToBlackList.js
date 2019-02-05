import { graphql } from 'react-apollo';

import { ADD_TO_BLACK_LIST_MUTATION } from 'chatty/src/graphql/add-black-list.mutation';
import { FRIEND_INVITATION_QUERY } from 'chatty/src/graphql/friend-invitation.query';
import { USER_QUERY } from 'chatty/src/graphql/user.query';
import { BLACK_LIST_QUERY } from 'chatty/src/graphql/black-list.query';
import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const addToBlacklistMutation = graphql(ADD_TO_BLACK_LIST_MUTATION, {
  props: ({ mutate, ownProps }) => ({
    makeAction: to => mutate({
      variables: { to, from: ownProps.auth.id },
      refetchQueries: [
        {
          query: BLACK_LIST_QUERY,
          variables: {
            userId: ownProps.auth.id,
          },
        },
        {
          query: FRIEND_INVITATION_QUERY,
          variables: {
            userId: ownProps.auth.id,
          },
        },
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

export default ActionComponent => connect(mapStateToProps)(addToBlacklistMutation(ActionComponent));
