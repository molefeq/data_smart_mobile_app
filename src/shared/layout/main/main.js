import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-native";
import Home from "../../../components/home/home";
import Register from "../../../components/register/register";
import Login from "../../../components/login/login";
import ForgotPassword from "../../../components/forgot-password/forgot-password";
import Checkout from "../../../components/checkout/checkout";
import BuyData from "../../../components/buy-data/buy-data";
import LinkDevice from "../../../components/link-device/link-device";
import PrivateRoute from "../../../common/routing/private-route";
import InternalError from "../../../components/error-views/internal-server";
import authenticationService from "../../services/authentication-service/authentication-service";
import { Content, Container } from "native-base";
import { StyleSheet } from "react-native";
import { VIEWS } from "../../../shared/constants/views";
import AppHeader from "../header/app-header";
import withHttpResponse from "../../../common/smartAppComponent/smartAppComponent";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isHeaderVisible: false
    };
  }

  componentDidMount = async () => {
    const response = await authenticationService.isAuthenticated();
    const currentView = VIEWS[this.props.location.pathname];

    this.setState({
      isHeaderVisible: currentView.requiresHeader,
      isAuthenticated: response
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.location.pathname === prevProps.location.pathname) {
      return;
    }

    const response = await authenticationService.isAuthenticated();
    const currentView = VIEWS[this.props.location.pathname];

    this.setState({
      isHeaderVisible: currentView.requiresHeader,
      isAuthenticated: response
    });
  };

  render() {
    const { isHeaderVisible, isAuthenticated } = this.state;

    return (
      <Container>
        {isHeaderVisible ? <AppHeader /> : null}
        <Content contentContainerStyle={styles.container}>
          <Switch>
            <PrivateRoute exact path="/" component={withHttpResponse(Home)} />
            <PrivateRoute
              path="/home"
              component={withHttpResponse(Home)}
              isAuthenticated={isAuthenticated}
            />
            <Route exact path="/login" component={withHttpResponse(Login)} />
            <Route exact path="/register" component={withHttpResponse(Register)} />
            <Route exact
              path="/forgot-password"
              component={withHttpResponse(ForgotPassword)}
            />
            <PrivateRoute exact
              path="/checkout"
              component={withHttpResponse(Checkout)}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute exact
              path="/buy-data"
              component={withHttpResponse(BuyData)}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute exact
              path="/link-device"
              component={withHttpResponse(LinkDevice)}
              isAuthenticated={isAuthenticated}
            />
            <Route path="/error" component={InternalError} />
          </Switch>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  }
});

export default withRouter(Main);
