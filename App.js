/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform } from "react-native";
import { NativeRouter } from "react-router-native";
import Main from "./src/shared/layout/main";
import httpRequestService from "./src/common/axios/request-interceptor";
import httpResponseService from "./src/common/axios/response-interceptor";
import store from "./src/common/app-redux/store";
import { Provider } from "react-redux";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <Main />
        </NativeRouter>
      </Provider>
    );
  }
}

export default App;

httpRequestService.setupRequestInterceptors(store);
httpResponseService.setupResponseInterceptors(store);
