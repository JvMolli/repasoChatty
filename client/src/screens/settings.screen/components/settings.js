import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  StyleSheet, Text, View, Button, TextInput,
} from 'react-native';

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
    };
  }

  changeName = () => {
    const {
      changeUserName,
      user: { id },
    } = this.props;
    const { username } = this.state;

    changeUserName(id, username)
      .then(data => console.log('DATADATDATA', data))
      .catch(err => console.log('ERRRRRRRRR', err));
  };

  render() {
    console.log('CHANGECHANGE', this.props);
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={text => this.setState({ username: text })}
          placeholder="Type your message here!"
        />
        <Button onPress={this.changeName} title="ok" color="#841584" />
      </View>
    );
  }
}

export default Settings;
