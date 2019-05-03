import React, { Component } from "react";
import { View } from "react-native";
import { withRouter } from "react-router-native";
import { Text, Button, Card, CardItem, Body } from "native-base";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./home-view-model";

const items = {
  header: "Welcome Abroad.",
  description:
    "Welcome to MVP app. Please link a device, buy mobile data and connect to the world whenever you are.",
  meta: ""
};

function HomeViewWithoutLinkedDevice(props) {
  const { linkDevice } = props;
  return (
    <Card>
      <CardItem header bordered>
        <Text>{items.header}</Text>
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text>{items.description}</Text>
        </Body>
      </CardItem>
      <CardItem footer bordered>
        <Button onPress={linkDevice} full>
          <Text>Link Device</Text>
        </Button>
      </CardItem>
    </Card>
  );
}

function HomeViewWithLinkedDevice(props) {
  const { buyData, device } = props;
  return (
    <Card>
      <CardItem header bordered>
        <Text>Device Information</Text>
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text>Device Name {device.deviceName}</Text>
          <Text>Device IMEI {device.serailNumber}</Text>
          <Text>
            Balance {device.currencyType} {device.balance}
          </Text>
          <Text>Balance Last Checked {device.lastDeviceCheck}</Text>
        </Body>
      </CardItem>
      <CardItem footer bordered>
        <Button onPress={buyData} full>
          <Text>Top Up Data</Text>
        </Button>
      </CardItem>
    </Card>
  );
}

class Home extends Component {
  componentDidMount = async () => {
    await this.props.getDevice();
  };

  render() {
    const { buyData, linkDevice, device } = this.props;
    const isDeviceLinked = Boolean(device) && Boolean(device.serailNumber);
    let home;

    if (isDeviceLinked) {
      home = <HomeViewWithLinkedDevice buyData={buyData} device={device} />;
    } else {
      home = <HomeViewWithoutLinkedDevice linkDevice={linkDevice} />;
    }

    return <View>{home}</View>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
