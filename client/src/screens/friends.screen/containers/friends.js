import React from 'react';

import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { USER_QUERY } from 'chatty/src/graphql/user.query';
import { Friends } from '../components';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const FriendsContainer = (props) => {
  const {
    auth: { id },
  } = props;
  return (
    <Query query={USER_QUERY} variables={{ id }}>
      {({ data }) => <Friends {...props} users={data && data.user ? data.user.friends : []} />}
    </Query>
  );
};

export default connect(mapStateToProps)(FriendsContainer);
