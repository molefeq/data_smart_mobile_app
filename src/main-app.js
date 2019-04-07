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
import AppHeader from './shared/layout/header/app-header'
import { VIEWS } from './shared/constants/views'
import { Container } from 'native-base';

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, isHeaderVisible: false };
    this.sideBarChange = this.sideBarChange.bind(this);
  }

  sideBarChange = visible => {
    this.setState({ visible: visible });
  };

  componentDidMount() {
    const currentView = VIEWS[this.props.location.pathname];

    console.log(this.props.location.pathname);
    console.log(currentView);

    this.setState({
      isHeaderVisible: Boolean(currentView) && currentView.requiresHeader
    });
  };

  render() {
    const isHeaderVisible = this.state.isHeaderVisible;
    return (
      <Container >
        {isHeaderVisible ? <AppHeader></AppHeader> : null}
        <Main></Main>
      </Container>
    );
  }
}


export default withRouter(MainApp);
