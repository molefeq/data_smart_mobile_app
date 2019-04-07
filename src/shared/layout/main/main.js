import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-native";
import Home from "../../../components/home/home";
import Register from "../../../components/register/register";
import Login from "../../../components/login/login";
import PrivateRoute from "../../../common/routing/private-route";
import authenticationService from '../../services/authentication-service/authentication-service';
import { Content } from "native-base";
import { StyleSheet } from 'react-native';

class Main extends Component {
  constructor(props) {
    super(props);
    this.goToHome = this.goToHome.bind(this);
    this.logOut = this.logOut.bind(this);
  };

  handleSidebarHide = () => {
    this.props.sideBarChange(false);
  };

  goToHome() {
    this.props.sideBarChange(false);
    this.props.history.push('/home');
  }

  logOut() {
    this.props.sideBarChange(false);
    authenticationService.signOut();
    this.props.history.push('/login');
  }

  render() {
    return (
      <Content contentContainerStyle={styles.container}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  }
});

export default withRouter(Main);
