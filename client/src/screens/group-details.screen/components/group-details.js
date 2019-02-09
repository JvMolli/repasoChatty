import React, { Component } from 'react';

import {
    ActivityIndicator,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';

import { NavigationActions, StackActions } from 'react-navigation';
import Logo from '../../../components/logo';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Main' })],
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupImageContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 6,
        alignItems: 'center',
    },
    groupName: {
        color: 'black',
    },
    groupNameBorder: {
        borderBottomWidth: 1,
        borderColor: '#dbdbdb',
        borderTopWidth: 1,
        flex: 1,
        paddingVertical: 8,
    },
    groupImage: {
        width: 54,
        height: 54,
        borderRadius: 27,
    },
    participants: {
        borderBottomWidth: 1,
        borderColor: '#dbdbdb',
        borderTopWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: '#dbdbdb',
        color: '#777',
    },
    user: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#dbdbdb',
        flexDirection: 'row',
        padding: 10,
    },
    username: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    titleWrapper: {
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleImage: {
        marginRight: 6,
        width: 32,
        height: 32,
        borderRadius: 16,
    },
});

class GroupDetails extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
    });

    constructor(props) {
        super(props);
        this.state = {
            groupName: "",

        }
    }

    componentDidMount() {
        if (this.props.group) this.setState({ groupName: this.props.group.name })
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.group) {
            this.setState({
                groupName: nextProps.group.name
            })
        }
        if (this.props.group) {
            if (this.props.group.name !== nextProps.group.name) {
                nextProps.navigation.setParams({ title: nextProps.group.name })
            }
        }
    }

    keyExtractor = item => item.id.toString();

    renderItem = ({ item: user }) => (
        <View style={styles.user}>
            <Logo style={styles.avatar} />
            <Text style={styles.username}>{user.username}</Text>
        </View>
    );

    deleteGroup = () => {
        const { deleteGroup, navigation } = this.props;
        deleteGroup(navigation.state.params.id)
            .then(() => {
                navigation.dispatch(resetAction);
            })
            .catch((e) => {
                console.log(e); // eslint-disable-line no-console
            });
    };

    leaveGroup = () => {
        const { auth, leaveGroup, navigation } = this.props;
        leaveGroup({
            id: navigation.state.params.id,
            userId: auth.id,
        }) // fake user for now
            .then(() => {
                navigation.dispatch(resetAction);
            })
            .catch((e) => {
                console.log(e); // eslint-disable-line no-console
            });
    };

    updateGroup = () => {
        const { auth, updateGroup, navigation, group } = this.props;
        const { groupName } = this.state;
        updateGroup({
            id: group.id,
            name: groupName,
        })
    }

    changeGroupName = (text) => {
        this.setState({ groupName: text })
    }

    render() {
        const { group, loading, auth } = this.props;
        const { groupName } = this.state;
        // render loading placeholder while we fetch messages
        if (!group || loading) {
            return (
                <View style={[styles.loading, styles.container]}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View>
                    {group.admin === auth.id ?
                        <View style={styles.detailsContainer}>
                            <TouchableOpacity
                                style={styles.groupImageContainer}
                                onPress={group.name !== groupName ? this.updateGroup : null}
                            >
                                <Logo style={(group.name !== groupName ? { borderColor: 'green', borderWidth: 7 } : {})} />
                                {group.name !== groupName ?
                                    < Text > Ok </Text> : null
                                }
                            </TouchableOpacity>
                            <View style={styles.groupNameBorder}>
                                <TextInput
                                    style={styles.groupName}
                                    defaultValue={group.name}
                                    onChangeText={text => this.changeGroupName(text)}
                                />
                            </View>
                        </View>
                        :
                        <View style={styles.detailsContainer}>
                            <TouchableOpacity style={styles.groupImageContainer} onPress={this.pickGroupImage}>
                                <Logo />
                            </TouchableOpacity>
                            <View style={styles.groupNameBorder}>
                                <Text style={styles.groupName}>{group.name}</Text>
                            </View>
                        </View>}
                </View>
                <FlatList
                    data={group.users}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    //refreshing={false}
                    keyboardShouldPersistTaps="always"
                    //extraData={this.state}
                    ListHeaderComponent={() => (
                        <View>


                            <Text style={styles.participants}>
                                {`participants: ${group.users.length}`.toUpperCase()}
                            </Text>
                        </View>
                    )}
                    ListFooterComponent={() => (
                        <View>
                            <Button title="Leave Group" onPress={this.leaveGroup} />
                            <Button title="Delete Group" onPress={this.deleteGroup} />
                        </View>
                    )}
                />
            </View>
        );
    }
}


export default GroupDetails
