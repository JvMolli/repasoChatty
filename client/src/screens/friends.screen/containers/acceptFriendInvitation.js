import { graphql } from 'react-apollo';
import { ACCEPT_FRIEND_INVITATION_MUTATION } from 'chatty/src/graphql/accept-friend-invitation.mutation';
import { FRIEND_INVITATION_QUERY } from 'chatty/src/graphql/friend-invitation.query';
import { USER_QUERY } from 'chatty/src/graphql/user.query';
import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({
  auth,
});


const acceptFriendInvitationMutation = graphql(
  ACCEPT_FRIEND_INVITATION_MUTATION,
  {
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
          {
            query: USER_QUERY,
            variables: {
              id: ownProps.auth.id,
            },
          },
        ],
      }),
    }),
  },
);

export default ActionComponent => connect(mapStateToProps)(acceptFriendInvitationMutation(ActionComponent));
