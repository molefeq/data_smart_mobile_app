/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-native';
import Main from './shared/layout/main/main'
import { Container } from 'native-base';

class MainApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container >
        <Main></Main>
      </Container>
    );
  }
}


export default withRouter(MainApp);
