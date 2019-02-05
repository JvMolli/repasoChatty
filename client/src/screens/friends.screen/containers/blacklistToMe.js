import R from 'ramda';
import React from 'react';

import { Query } from 'react-apollo';

import { BLACK_LIST_QUERY } from 'chatty/src/graphql/black-list.query';
import { connect } from 'react-redux';

import { Friends } from '../components';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const BlackListToMeContainer = (props) => {
  const { auth } = props;

  return (
    <Query query={BLACK_LIST_QUERY} variables={{ userId: auth.id }}>
      {({ data }) => (
        <Friends
          {...props}
          users={
            !data.blackList
              ? []
              : R.pluck('from', R.filter(({ to: { id } }) => id === auth.id, data.blackList))
          }
        />
      )}
    </Query>
  );
};

export default connect(mapStateToProps)(BlackListToMeContainer);
