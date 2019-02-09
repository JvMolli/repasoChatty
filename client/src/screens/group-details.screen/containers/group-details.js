import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import GroupDetails from '../components/group-details'
import GROUP_QUERY from '../../../graphql/group.query';
import { USER_QUERY } from '../../../graphql/user.query';
import DELETE_GROUP_MUTATION from '../../../graphql/delete-group.mutation';
import UPDATE_GROUP_MUTATION from '../../../graphql/update-group.mutation';
import LEAVE_GROUP_MUTATION from '../../../graphql/leave-group.mutation';

const groupQuery = graphql(GROUP_QUERY, {
    options: ownProps => ({ variables: { groupId: ownProps.navigation.state.params.id } }),
    props: ({ data: { loading, group } }) => ({
        loading,
        group,
    }),
});

const deleteGroupMutation = graphql(DELETE_GROUP_MUTATION, {
    props: ({ mutate }) => ({
        deleteGroup: id => mutate({
            variables: { id },
            update: (store, { data: { deleteGroup } }) => {
                // Read the data from our cache for this query.
                const data = store.readQuery({ query: USER_QUERY, variables: { id } }); // fake for now

                // Add our message from the mutation to the end.
                data.user.groups = data.user.groups.filter(g => deleteGroup.id !== g.id);

                // Write our data back to the cache.
                store.writeQuery({
                    query: USER_QUERY,
                    variables: { id }, // fake for now
                    data,
                });
            },
        }),
    }),
});

const updateGroupMutation = graphql(UPDATE_GROUP_MUTATION, {
    props: ({ mutate }) => ({
        updateGroup: (group) => mutate({
            variables: { group },
            refetchQueries: ['group']
        }),
    }),
});

const leaveGroupMutation = graphql(LEAVE_GROUP_MUTATION, {
    props: ({ mutate }) => ({
        leaveGroup: ({ id, userId }) => mutate({
            variables: { id, userId },
            update: (store, { data: { leaveGroup } }) => {
                // Read the data from our cache for this query.
                const data = store.readQuery({ query: USER_QUERY, variables: { id: userId } }); // fake for now

                // Add our message from the mutation to the end.
                data.user.groups = data.user.groups.filter(g => leaveGroup.id !== g.id);

                // Write our data back to the cache.
                store.writeQuery({
                    query: USER_QUERY,
                    variables: { id: userId }, // fake for now
                    data,
                });
            },
        }),
    }),
});
const mapStateToProps = ({ auth }) => ({
    auth,
});

export default compose(
    connect(mapStateToProps),
    groupQuery,
    deleteGroupMutation,
    leaveGroupMutation,
    updateGroupMutation,
)(GroupDetails);