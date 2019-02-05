import R from 'ramda';
import React from 'react';

import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import { FRIEND_INVITATION_QUERY } from 'chatty/src/graphql/friend-invitation.query';

import { Friends } from '../components';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const FriendInvitationToMeContainer = (props) => {
  const { auth } = props;
  return (
    <Query query={FRIEND_INVITATION_QUERY} variables={{ userId: props.auth.id }}>
      {({ data }) => (
        <Friends
          {...props}
          users={
            data.friendInvitations
              ? R.pluck(
                'from',
                R.filter(({ to: { id } }) => id === auth.id, data.friendInvitations),
              )
              : []
          }
        />
      )}
    </Query>
  );
};

export default connect(mapStateToProps)(FriendInvitationToMeContainer);
