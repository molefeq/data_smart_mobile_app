import React, { Component } from "react";
import { Route, Redirect } from "react-router-native";
import { connect } from "react-redux";

class PrivateRoute extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.renderRoute = this.renderRoute.bind(this);
  }

  renderRoute = innerProps => {
    const { component: Component, session, ...rest } = this.props;
    return session && session.isUserAuthenticated ? (
      <Component {...innerProps} />
    ) : (
      <Redirect to="/login" />
    );
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Route
        render={props => {
          return this.renderRoute(props);
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return { session: state.session };
}

export default connect(mapStateToProps)(PrivateRoute);
