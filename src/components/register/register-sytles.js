import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  headerLogo: {
    width: 200,
    height: 200
  },
  logoContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 50
  },
  formContainer: {
    marginTop: 25
  },
  forgetPasswordContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  forgetPasswordText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007bff"
  },
  registerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007bff"
  },
  validationMessage: {
    fontSize: 14,
    paddingLeft: 15,
    color: "#FF0000"
  },
  loginContainer: {
    marginLeft: 15,
    marginTop: 20
  },
  loginButton: {
    marginBottom: 20
  }
});
