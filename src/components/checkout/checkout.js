import React, { Component } from "react";
import { withRouter } from "react-router-native";
//import QRCodeScanner from "react-native-qrcode-scanner";
import { WebView } from "react-native-webview";
import { mapStateToProps, mapDispatchToProps } from "./checkout-view-model";
import { styles } from "./checkout-styles";
import { connect } from "react-redux";
import { Image, View } from "react-native";

class Checkout extends Component {
  componentDidMount = async () => {
    await this.props.getProcessUrl(this.props.buyData.amount);
  };

  render() {
    const processUrl = this.props.checkout.processUrl;
    const handleWebViewNavigationStateChange = this.props
      .handleWebViewNavigationStateChange;

    return (
      <View style={styles.container}>
        <WebView
          ref={ref => (this.webview = ref)}
          source={{ uri: processUrl }}
          style={styles.video}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          onNavigationStateChange={newNavState =>
            handleWebViewNavigationStateChange(newNavState, this.webview, this.props.buyData.amount)
          }
        />
      </View>
      /* <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            Go to{" "}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />*/
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Checkout));
