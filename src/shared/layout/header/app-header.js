import React, { Component } from "react";
import { withRouter } from "react-router-native";
import { Header, Left, Body, Button, Icon, Title } from 'native-base';

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  handleShowClick = () => this.props.sideBarChange(true);
  navigate = (route) => this.props.history.push(route);

  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>ROV Mobile</Title>
        </Body>
      </Header>
    );
  }
}

export default withRouter(AppHeader);
