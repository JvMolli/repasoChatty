import R from 'ramda';
import React from 'react';

import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import { FRIEND_INVITATION_QUERY } from 'chatty/src/graphql/friend-invitation.query';

import { Friends } from '../components';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const FriendInvitationFromMeContainer = (props) => {
  const { auth } = props;
  console.log(props);
  return (
    <Query query={FRIEND_INVITATION_QUERY} variables={{ userId: auth.id }}>
      {({ data }) => (
        <Friends
          {...props}
          users={
            data.friendInvitations
              ? R.pluck(
                'to',
                R.filter(({ from: { id } }) => id === auth.id, data.friendInvitations),
              )
              : []
          }
        />
      )}
    </Query>
  );
};

export default connect(mapStateToProps)(FriendInvitationFromMeContainer);
