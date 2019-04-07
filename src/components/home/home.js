import React, { Component } from 'react';
import { Text, View } from 'react-native';

const items = [
  {
    header: 'Welcome Abroad.',
    description: 'Welcome to MVP app. Please add a device, buy mobile data and connect to the world whenever you are.',
    meta: '',
  }
];

class Home extends Component {
  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

export default Home;
