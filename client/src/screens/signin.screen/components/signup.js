import React, { Component } from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingViewBase,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
    paddingHorizontal: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderRadius: 4,
    marginVertical: 6,
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  loadingContainer: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  switchAction: {
    paddingHorizontal: 4,
    color: 'blue',
  },
  submit: {
    marginVertical: 6,
  },
});

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      changeEmail, changeUserName, changePassword, changeRePassword, signup,
    } = this.props;
    console.log(this.props);
    return (
      <View>
        <TextInput
          onChangeText={text => changeEmail(text)}
          placeholder="Email"
          style={styles.input}
        />
        <TextInput onChangeText={changeUserName} placeholder="UserName" style={styles.input} />
        <TextInput onChangeText={changePassword} placeholder="Password" style={styles.input} />
        <TextInput
          onChangeText={changeRePassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        <Button onPress={signup} title="pepe" />
      </View>
    );
  }
}

export default Signup;
