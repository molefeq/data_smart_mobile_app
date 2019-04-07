import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Checkbox, Form, Message } from "semantic-ui-react";

export default class OAuth extends Component {
  state = {
    user: {},
    disabled: ""
  };

  componentDidMount() {
    const { socket, provider } = this.props;

    socket.on(provider, user => {
      this.popup.close();
      this.setState({ user });
    });
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: "" });
      }
    }, 1000);
  }

  openPopup() {
    const { provider, socket } = this.props;
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    
      const url = `https://localhost:5001/api/account/externallogin/google`;

    return window.open(
      url,
      "Authenticate Account",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: "disabled" });
    }
  };

  closeCard = () => {
    this.setState({ user: {} });
  };

  render() {
    const { name, photo } = this.state.user;
    const { provider } = this.props;
    const { disabled } = this.state;
    const atSymbol = provider === "twitter" ? "@" : "";

    return (
      <div>
        {name ? (
          <div className="card">
            <img src={photo} alt={name} />
            <Icon disabled name="close" onClick={this.closeCard} />
            <h4>{`${atSymbol}${name}`}</h4>
          </div>
        ) : (
          <div className="button-wrapper fadein-fast">
            <button
              onClick={this.startAuth}
              className={`${provider} ${disabled} button`}
            >
              <Icon disabled name={provider} />
            </button>
          </div>
        )}
      </div>
    );
  }
}

OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
};
