import React, { Component } from "react";
import { withRouter } from "react-router-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { mapStateToProps, mapDispatchToProps } from "./link-device-view-model";
import { styles } from "./link-device-styles";
import { connect } from "react-redux";
import { Text, TouchableOpacity } from "react-native";

class LinkDevice extends Component {
  render() {
    const readQrCode = this.props.readQrCode;
    const cancel = this.props.cancel;

    return (
      <QRCodeScanner
        onRead={e => readQrCode(e)}
        topContent={
          <Text style={styles.centerText}>
            Open the device and scan the QR Code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable} onPress={cancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LinkDevice));
