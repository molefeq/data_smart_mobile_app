import React, { Component } from "react";
import { withRouter } from "react-router-native";
import { Button, Text } from "native-base";
import { View } from "react-native";

class InternalServer extends Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.back();
  }

  render() {
    return (
      <View>
        <Button onPress={this.goBack} full>
          <Text>Error occurred</Text>
        </Button>
      </View>
    );
  }
}

export default withRouter(InternalServer);
