import React, { Component } from "react";
import { withRouter } from "react-router-native";
import { Text, Form, Item, Input, Label, Button } from "native-base";
import { Formik } from "formik";
import logo from "../../assets/images/logo_white_bg.png"; // Tell Webpack this JS file uses this image
import { Image, View } from "react-native";
import { styles } from "./forgot-password-styles";
import {
  initialValues,
  validationSchema,
  mapStateToProps,
  mapDispatchToProps
} from "./forgot-password-view-model";
import { connect } from "react-redux";

class ForgotPassword extends Component {
  render() {
    const forgotPassword = this.props.forgotPassword;
    const { onForgotPasswordClick, onInputChange, goToLocation } = this.props;

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onForgotPasswordClick}
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
                    />
                  </Item>
                  {touched.username && errors.username ? (
                    <Text style={styles.validationMessage}>
                      {errors.username}
                    </Text>
                  ) : null}
                  {forgotPassword.validationMessages &&
                  forgotPassword.validationMessages.length
                    ? forgotPassword.validationMessages.map((item, key) => (
                        <Text key={key} style={styles.validationMessage}>
                          {item}
                        </Text>
                      ))
                    : null}
                </Form>
                <View style={styles.loginContainer}>
                  <Button
                    onPress={props.handleSubmit}
                    full
                    disabled={isSubmitting ? isSubmitting : undefined}
                    style={styles.loginButton}
                  >
                    <Text>Reset</Text>
                  </Button>
                  <Button
                    light
                    onPress={() => goToLocation("/login")}
                    full
                    disabled={isSubmitting ? isSubmitting : undefined}
                  >
                    <Text>Cancel</Text>
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
)(withRouter(ForgotPassword));
