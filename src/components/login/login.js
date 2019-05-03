import React, { Component } from "react";
import { withRouter } from "react-router-native";
import { Text, Form, Item, Input, Label, Button } from "native-base";
import { Formik } from "formik";
import logo from "../../assets/images/logo_white_bg.png"; // Tell Webpack this JS file uses this image
import { Image, View } from "react-native";
import { connect } from "react-redux";
import { styles } from "./login-styles";
import {
  initialValues,
  validationSchema,
  mapStateToProps,
  mapDispatchToProps
} from "./login-view-model";

class Login extends Component {
  render() {
    const login = this.props.login;
    const { onLoginClick, onInputChange, goToLocation } = this.props;

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onLoginClick}
        validationSchema={validationSchema}
        render={props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleSubmit,
            setFieldTouched
          } = props;

          return (
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.headerLogo} />
              </View>
              <View style={styles.formContainer}>
                <Form size="large" onSubmit={handleSubmit}>
                  <Item stackedLabel>
                    <Label>Username (Your email address)</Label>
                    <Input
                      onChangeText={e =>
                        onInputChange(
                          "username",
                          e,
                          setFieldTouched,
                          handleChange("username")
                        )
                      }
                      value={values.username}
                    />
                  </Item>
                  {touched.username && errors.username ? (
                    <Text style={styles.validationMessage}>
                      {errors.username}
                    </Text>
                  ) : null}
                  <Item stackedLabel last>
                    <Label>Password</Label>
                    <Input
                      secureTextEntry={true}
                      onChangeText={e =>
                        onInputChange(
                          "password",
                          e,
                          setFieldTouched,
                          handleChange("password")
                        )
                      }
                      value={values.password}
                    />
                  </Item>
                  {touched.password && errors.password ? (
                    <Text style={styles.validationMessage}>
                      {errors.password}
                    </Text>
                  ) : null}
                  {login.validationMessages && login.validationMessages.length
                    ? login.validationMessages.map((item, key) => (
                        <Text key={key} style={styles.validationMessage}>
                          {item}
                        </Text>
                      ))
                    : null}
                  <View style={styles.forgetPasswordContainer}>
                    <Text
                      onPress={() => goToLocation("/forgot-password")}
                      style={styles.forgetPasswordText}
                    >
                      Forgot Password
                    </Text>
                    <Text
                      onPress={() => goToLocation("/register")}
                      style={styles.registerText}
                    >
                      Register
                    </Text>
                  </View>
                </Form>
                <View style={styles.loginContainer}>
                  <Button
                    onPress={props.handleSubmit}
                    full
                    disabled={isSubmitting ? isSubmitting : undefined}
                  >
                    <Text>Login</Text>
                  </Button>
                </View>
              </View>
            </View>
          );
        }}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
