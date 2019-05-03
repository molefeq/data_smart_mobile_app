import { StyleSheet, Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height - 150;
const deviceWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: deviceHeight,
  },
  video: {
    marginTop: 20,
    width: deviceWidth,
    height: deviceHeight,
    maxWidth: deviceWidth,
    maxHeight: deviceHeight,
    flex: 0
    // maxHeight: 200,
    //width: 320,
    //flex: 1
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  }
});
