import React, { Component } from 'react';

import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavigationActions, StackActions } from 'react-navigation';
import Logo from '../components/logo';

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
});

class GroupDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });

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

  render() {
    const { group, loading } = this.props;

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
        <FlatList
          data={group.users}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListHeaderComponent={() => (
            <View>
              <View style={styles.detailsContainer}>
                <TouchableOpacity style={styles.groupImageContainer} onPress={this.pickGroupImage}>
                  <Logo />
                  <Text>edit</Text>
                </TouchableOpacity>
                <View style={styles.groupNameBorder}>
                  <Text style={styles.groupName}>{group.name}</Text>
                </View>
              </View>
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
