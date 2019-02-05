import { graphql } from 'react-apollo';

import { CANCEL_FRIEND_INVITATION_MUTATION } from 'chatty/src/graphql/cancel-friend-invitation.mutation';
import { FRIEND_INVITATION_QUERY } from 'chatty/src/graphql/friend-invitation.query';

import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const cancelFriendInvitationMutationToMe = graphql(CANCEL_FRIEND_INVITATION_MUTATION, {
  props: ({ mutate, ownProps }) => ({
    makeAction: from => mutate({
      variables: { to: ownProps.auth.id, from },
      refetchQueries: [
        {
          query: FRIEND_INVITATION_QUERY,
          variables: {
            userId: ownProps.auth.id,
          },
        },
      ],
    }),
  }),
});

export default ActionComponent => connect(mapStateToProps)(cancelFriendInvitationMutationToMe(ActionComponent));
