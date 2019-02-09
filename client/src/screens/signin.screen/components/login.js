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
  TouchableHighlight,
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    backgroundColor: 'transparent',
    fontStyle: 'italic',
    textShadowColor: 'green',
  },
  boton: {
    padding: 20,
    marginTop: 10,
    backgroundColor: '#071733',
    alignItems: 'center',
    borderRadius: 30,
  },
  textButton: {
    color: 'white',
    textShadowColor: 'red',
    textDecorationLine: 'underline',
  },
});

const Login = (args) => {
  return (
    <KeyboardAvoidingView style={styles.inputContainer}>
      <TextInput
        onChangeText={text => args.changeEmail(text)}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        onChangeText={text => args.changePassword(text)}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <TouchableHighlight style={styles.boton} onPress={args.login}>
        <Text style={styles.textButton}>PEPE</Text>
      </TouchableHighlight>
    </KeyboardAvoidingView>
  );
};
export default Login;
