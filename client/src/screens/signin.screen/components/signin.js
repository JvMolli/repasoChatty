import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import { setCurrentUser } from '../../../actions/auth.actions';
import Logo from '../../../components/logo';
import Login from './login';
import Signup from './signup';

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
    paddingHorizontal: 50,
  },
  logo: {
    flex: 0.1,
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: { flex: 0.6 },
});

class Signin extends Component {
  static navigationOptions = {
    title: 'Chatty',
    headerLeft: null,
  };

  constructor(props) {
    super(props);
    if (props.auth && props.auth.jwt) {
      props.navigation.goBack();
    }

    this.state = {
      view: 'login',
      email: 'Elwin_Towne@gmail.com',
      password: 'Elwin_Towne@gmail.com',
      repassword: '',
      username: '',
    };
  }

  // eslint-disable-next-line react/sort-comp
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.jwt) {
      nextProps.navigation.goBack();
    }
  }

  componentDidMount() {
    const {
      auth: { jwt },
      navigation: { navigate },
    } = this.props;
    if (jwt) navigate('App');
  }

  login = () => {
    const { email, password, view } = this.state;
    const { login, dispatch } = this.props;

    this.setState({
      loading: true,
    });

    login({ email, password })
      .then(({ data: { login: user } }) => {
        dispatch(setCurrentUser(user));
        this.setState({
          loading: false,
        });
        dispatch(
          NavigationActions.navigate({
            routeName: 'App',
          }),
        );
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        Alert.alert(`${capitalizeFirstLetter(view)} error`, error.message, [
          { text: 'OK', onPress: () => console.log('OK pressed') }, // eslint-disable-line no-console
          {
            text: 'Forgot password',
            onPress: () => console.log('Forgot Pressed'),
            style: 'cancel',
          }, // eslint-disable-line no-console
        ]);
      });
  };

  signup = () => {
    const { view, password, repassword } = this.state;
    const { signup, dispatch } = this.props;

    if (password !== repassword) {
      Alert.alert('TU CONTRASEÑA no coincide');
      return null;
    }

    this.setState({
      loading: true,
    });
    const { email } = this.state;
    signup({ email, password })
      .then(({ data: { signup: user } }) => {
        dispatch(setCurrentUser(user));
        this.setState({
          loading: false,
        });
        dispatch(
          NavigationActions.navigate({
            routeName: 'App',
          }),
        );
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        Alert.alert(
          `${capitalizeFirstLetter(view)} error`,
          error.message,
          [{ text: 'OK', onPress: () => console.log('OK pressed') }], // eslint-disable-line no-console
        );
      });
  };

  changeUserName = (text) => {
    console.log('holaaaaaa');
    this.setState({
      username: text,
    });
  };

  changeEmail = (text) => {
    console.log('holaaaaaa');
    this.setState({
      email: text,
    });
  };

  changePassword = (text) => {
    console.log('holaaaaaa');
    this.setState({
      password: text,
    });
  };

  changeRePassword = (text) => {
    console.log('repass');
    this.setState({
      repassword: text,
    });
  };

  changeView = () => {
    const { view } = this.state;
    this.setState({
      view: view === 'login' ? 'sigup' : 'login',
    });
  };

  render() {
    const { view, email } = this.state;
    console.log('STADO', email);
    return (
      <KeyboardAvoidingView enabled style={styles.container}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <View styles={styles.inputContainer}>
          <View>
            {view === 'login' ? (
              <Login
                changeEmail={this.changeEmail}
                changePassword={this.changePassword}
                login={this.login}
              />
            ) : (
              <Signup
                changeEmail={this.changeEmail}
                changePassword={this.changePassword}
                changeRePassword={this.changeRePassword}
                changeUserName={this.changeUserName}
                signup={this.signup}
              />
            )}
          </View>
          <View>
            <TouchableOpacity onPress={this.changeView}>
              <Text>{view === 'login' ? 'signup' : 'signin'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Signin;
