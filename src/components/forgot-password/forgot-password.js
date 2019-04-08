import React, { Component } from 'react';
import { withRouter } from "react-router-native";
import { Text, Form, Item, Input, Label, Button } from 'native-base';
import { Formik } from "formik";
import * as Yup from 'yup'
import forgotPasswordService from "./forgot-password-service";
import logo from '../../assets/images/logo_white_bg.png'; // Tell Webpack this JS file uses this image
import { Image, StyleSheet, View } from 'react-native';

const initialValues = {
  username: ""
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Username must be a valid email address.")
    .required("Username is required.")
});

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationMessages: []
    };

    this.handleForgotPasswordSubmit = this.handleForgotPasswordSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.goToLocation = this.goToLocation.bind(this);
  };

  handleForgotPasswordSubmit = async (values, { props = this.props, resetForm, setErrors, setSubmitting }) => {
    this.setState({
      validationMessages: []
    });
    var response = await forgotPasswordService.resetPassword(values.username);
    setSubmitting(false);

    if (response.status === 200) {
      this.props.history.push("/login");
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

  goToLocation(location) {
    this.props.history.push(location);
  }

  render() {

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleForgotPasswordSubmit}
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
                  {this.state.validationMessages && this.state.validationMessages.length ? (
                    <Text negative list={this.state.validationMessages}>
                    </Text>
                  ) : null}
                </Form>
                <View style={styles.loginContainer}>
                  <Button onPress={props.handleSubmit} full 
                          disabled={isSubmitting ? 'disabled' : undefined}
                          style={styles.loginButton}>
                    <Text>Reset</Text>
                  </Button>
                  <Button light onPress={()=>this.goToLocation('/login')} full disabled={isSubmitting ? 'disabled' : undefined}>
                    <Text>Cancel</Text>
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

export default withRouter(ForgotPassword);

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
  },
  loginButton: {
    marginBottom: 20,
  }
});



