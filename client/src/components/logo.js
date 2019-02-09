import React from 'react';
import { Image, StyleSheet } from 'react-native';

import logo from '../images/logo.png';

const styles = StyleSheet.create({
  default: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
});

const Logo = ({ style = {} }) => <Image style={[styles.default, style]} source={logo} />;


export default Logo;
