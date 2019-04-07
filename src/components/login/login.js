import React, { Component } from "react";
import { withRouter } from "react-router-native";
import { Text, Form, Item, Input, Label, Button } from 'native-base';
import { Formik } from "formik";
import * as Yup from 'yup'
import loginService from "./loginService";
import logo from '../../assets/images/logo.png'; // Tell Webpack this JS file uses this image
import { Image, StyleSheet, View } from 'react-native';

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Username must be a valid email address.")
    .required("Username is required."),
  password: Yup.string()
    .min(8, "Password cannot be shorted than 8 characters.")
    .required("Password is required.")
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationMessages: []
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  };

  handleLoginSubmit = async (values, { props = this.props, resetForm, setErrors, setSubmitting }) => {
    this.setState({
      validationMessages: []
    });
    var response = await loginService.login(values);
    setSubmitting(false);

    if (response.status === 200) {
      authenticationService.authenticate(response.data);
      this.props.history.push("/home");
      return;
    }

    if (response.status === 422) {
      let validationMessages = [];

      response.data.forEach((item, index) => {
        if (item.fieldName) {
          setErrors({ [item.fieldName]: item.message });
        } else {
          validationMessages.push(item.message);
        }
      });

      this.setState({
        validationMessages: validationMessages
      });
    }
  };

  handleInputChange(name, e, setFieldTouched, handleChange) {
    this.setState({
      validationMessages: []
    });

    handleChange(e);
    setFieldTouched(name, true);
  }

  render() {

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleLoginSubmit}
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
                    <Input onChangeText={(e) => this.handleInputChange('username', e, setFieldTouched, handleChange('username'))} />
                  </Item>
                  {touched.username && errors.username ? (
                    <Text style={styles.validationMessage}>
                      {errors.username}
                    </Text>
                  ) : null}
                  <Item stackedLabel last>
                    <Label>Password</Label>
                    <Input textContentType='password' onChangeText={(e) => this.handleInputChange('password', e, setFieldTouched, handleChange('password'))} />
                  </Item>
                  {touched.password && errors.password ? (
                    <Text style={styles.validationMessage}>
                      {errors.password}
                    </Text>
                  ) : null}
                  {this.state.validationMessages && this.state.validationMessages.length ? (
                    <Text negative list={this.state.validationMessages}>
                    </Text>
                  ) : null}
                  <View style={styles.forgetPasswordContainer}>
                    <Text href="/forgot-password" style={styles.forgetPasswordText}>Forgot Password</Text>
                    <Text href="/register" style={styles.registerText}>Register</Text>
                  </View>
                </Form>
                <View style={styles.loginContainer}>
                  <Button onPress={props.handleSubmit} full disabled={isSubmitting ? 'disabled' : undefined}>
                    <Text>Login</Text>
                  </Button>
                </View>
              </View>
            </View>
          );
        }
        }
      />
    );
  }
}

export default withRouter(Login);

var styles = StyleSheet.create({
  container: {
    padding: 15
  },
  headerLogo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 50
  },
  formContainer: {
    marginTop: 25
  },
  forgetPasswordContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  forgetPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007bff',
  },
  registerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007bff',
  },
  validationMessage: {
    fontSize: 14,
    paddingLeft: 15,
    color: '#FF0000',
  },
  loginContainer: {
    marginLeft: 15,
    marginTop: 20,
  }
});

