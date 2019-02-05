import { graphql } from 'react-apollo';

import { REMOVE_FROM_BLACK_LIST_MUTATION } from 'chatty/src/graphql/remove-from-black-list.mutation';
import { BLACK_LIST_QUERY } from 'chatty/src/graphql/black-list.query';


import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const removeFromBlacklistMutation = graphql(REMOVE_FROM_BLACK_LIST_MUTATION, {
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
      ],
    }),
  }),
});


export default ActionComponent => connect(mapStateToProps)(removeFromBlacklistMutation(ActionComponent));