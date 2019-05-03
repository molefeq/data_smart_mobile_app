import React, { Component } from "react";
import { connect } from "react-redux";
import { RESET } from "../app-redux/actions/actionTypes";

export default function withHttpResponse(ComposedComponent) {
  class SmartAppComponent extends Component {
    componentWillMount() {
      if (!this.props.session.isRequestAuthorized) {
        this.props.resetRequestStore();
        this.props.history.push("/login");
      }

      if (
        this.props.session.isInternalServerError ||
        this.props.session.isRequestNotFound ||
        this.props.session.isBadRequest
      ) {
        this.props.resetRequestStore();
        this.props.history.push("/error");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.session.isRequestAuthorized) {
        this.props.resetRequestStore();
        this.props.history.push("/login");
      }

      if (
        nextProps.session.isInternalServerError ||
        nextProps.session.isRequestNotFound ||
        nextProps.session.isBadRequest
      ) {
        this.props.resetRequestStore();
        this.props.history.push("/error");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state, ownProps) {
    return {
      session: state.session,
      resetRequestStore: ownProps.resetRequestStore
    };
  }

  function mapDispatchToProps(dispatch, ownProps) {
    return {
      resetRequestStore: () => {
        dispatch({ type: RESET });
      }
    };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(SmartAppComponent);
}
