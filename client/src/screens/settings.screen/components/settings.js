import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View, Button, TextInput,
} from 'react-native';
import { setCurrentUser, logout } from '../../../actions/auth.actions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  warning: {
    textAlign: 'center',
    padding: 12,
  },
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };
  }

  componentDidMount() {
    const { auth } = this.props;
    this.setState({
      username: auth.username,
      email: auth.email,
      oldUserName: auth.username,
      oldUserMail: auth.email,
    });
  }

  changeName = async () => {
    const {
      changeUserName,
      user: { id },
      dispatch,
    } = this.props;
    const { username } = this.state;

    await changeUserName(id, username).then(({ data: { changeUserName: user } }) => dispatch(setCurrentUser(user)));
    this.setState({
      oldUserName: username,
    });
  };

  changeEmail = async () => {
    const {
      changeUserMail,
      user: { id },
      dispatch,
    } = this.props;
    const { email } = this.state;

    await changeUserMail(id, email).then(({ data: { changeUserMail: user } }) => dispatch(setCurrentUser(user)));
    this.setState({
      oldUserMail: email,
    });
  };

  logout = () => {
    const {
      dispatch,
      navigation: { navigate },
    } = this.props;
    dispatch(logout());
    navigate('Auth');
  };

  render() {
    const { auth, user } = this.props;
    const {
      username, email, oldUserName, oldUserMail,
    } = this.state;

    // console.log("USER AUTH", user, auth);
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            onChangeText={text => this.setState({ username: text })}
            placeholder={oldUserName}
          />
          {username != auth.username ? (
            <Button onPress={this.changeName} title="change" color="#841584" />
          ) : null}
        </View>
        <View>
          <TextInput
            onChangeText={text => this.setState({ email: text })}
            placeholder={oldUserMail}
          />
          {email != auth.email ? (
            <Button onPress={this.changeEmail} title="changeMAIL" color="#841584" />
          ) : null}
        </View>
        <View>
          <Button onPress={this.logout} title="logout" color="red" />
        </View>
      </View>
    );
  }
}

export default Settings;
