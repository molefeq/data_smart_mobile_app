import React, { Component } from "react";
import { withRouter } from "react-router-native";
import { Text, Form, Item, Input, Label, Button,Picker, Icon } from 'native-base';
import { Formik } from "formik";
import * as Yup from 'yup'
import logo from '../../assets/images/logo_white_bg.png'; // Tell Webpack this JS file uses this image
import { Image, StyleSheet, View } from 'react-native';
import registerService from "./registerService";

const initialValues = {
  emailAddress: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  countryId: ""
};

const validationSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .email("Username must be a valid email address.")
    .required("Username is required."),
  firstName: Yup.string().required("FirstName is required."),
  lastName: Yup.string().required("LastName is required."),
  password: Yup.string()
    .min(8, "Password cannot be shorted than 8 characters.")
    .required("Password is required."),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Confirm Password must match Password.')
    .min(8, "Confirm Password cannot be shorted than 8 characters.")
    .required("Confirm Password is required."),
  countryId: Yup.string().required("Country is required.")
});



const countryOptions = [
  { value: "1", text: "Afghanistan" },
  { value: "1", text: "Aland Islands" },
  { value: "1", text: "Albania" },
  { value: "1", text: "Algeria" },
  { value: "1", text: "American Samoa" },
  { value: "1", text: "Andorra" },
  { value: "1", text: "Angola" },
  { value: "1", text: "Anguilla" },
  { value: "1", text: "Antigua" },
  { value: "1", text: "Argentina" },
  { value: "1", text: "Armenia" },
  { value: "1", text: "Aruba" },
  { value: "1", text: "Australia" },
  { value: "1", text: "Austria" },
  { value: "1", text: "Azerbaijan" },
  { value: "1", text: "Bahamas" },
  { value: "1", text: "Bahrain" },
  { value: "1", text: "Bangladesh" },
  { value: "1", text: "Barbados" },
  { value: "1", text: "Belarus" },
  { value: "1", text: "Belgium" },
  { value: "1", text: "Belize" },
  { value: "1", text: "Benin" },
  { value: "1", text: "Bermuda" },
  { value: "1", text: "Bhutan" },
  { value: "1", text: "Bolivia" },
  { value: "1", text: "Bosnia" },
  { value: "1", text: "Botswana" },
  { value: "1", text: "Bouvet Island" },
  { value: "1", text: "Brazil" },
  { value: "1", text: "British Virgin Islands" },
  { value: "1", text: "Brunei" },
  { value: "1", text: "Bulgaria" },
  { value: "1", text: "Burkina Faso" },
  { value: "1", text: "Burundi" },
  { value: "1", text: "Caicos Islands" },
  { value: "1", text: "Cambodia" },
  { value: "1", text: "Cameroon" },
  { value: "1", text: "Canada" } 
];

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationMessages: [],
      countries: []
    };
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleRegisterSubmit = async (values, { props = this.props, resetForm, setErrors, setSubmitting }) => {
    this.setState({
      validationMessages: []
    });
    var response = await registerService.register(values);
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

  componentDidMount = async() => {
    const countries = await registerService.countries();
    this.setState({
      countries: countries
    });
  }

  handleInputChange(name, e, setFieldTouched, handleChange) {
    this.setState({
      validationMessages: []
    });

    handleChange(e);
    setFieldTouched(name, true);
  }

  cancel() {
    this.props.history.push('/login');
  }

  handleDropdownChange = (e, { value }, setFieldValue, name) => {
    this.setState({
      validationMessages: []
    });
    setFieldValue(name, value, true);
  }

  render() {

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleRegisterSubmit}
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
                    <Label>Email Address</Label>
                    <Input onChangeText={(e) => this.handleInputChange('emailAddress', e, setFieldTouched, handleChange('emailAddress'))} />
                  </Item>
                  {touched.emailAddress && errors.emailAddress ? (
                    <Text style={styles.validationMessage}>
                      {errors.emailAddress}
                    </Text>
                  ) : null}
                  <Item stackedLabel>
                    <Label>FirstName</Label>
                    <Input onChangeText={(e) => this.handleInputChange('firstName', e, setFieldTouched, handleChange('firstName'))} />
                  </Item>
                  {touched.firstName && errors.firstName ? (
                    <Text style={styles.validationMessage}>
                      {errors.firstName}
                    </Text>
                  ) : null}
                  <Item stackedLabel>
                    <Label>LastName</Label>
                    <Input onChangeText={(e) => this.handleInputChange('lastName', e, setFieldTouched, handleChange('lastName'))} />
                  </Item>
                  {touched.lastName && errors.lastName ? (
                    <Text style={styles.validationMessage}>
                      {errors.lastName}
                    </Text>
                  ) : null}
                  <Item stackedLabel>
                    <Label>Password</Label>
                    <Input onChangeText={(e) => this.handleInputChange('password', e, setFieldTouched, handleChange('password'))} />
                  </Item>
                  {touched.password && errors.password ? (
                    <Text style={styles.validationMessage}>
                      {errors.password}
                    </Text>
                  ) : null}
                  <Item stackedLabel>
                    <Label>Confirm Password</Label>
                    <Input onChangeText={(e) => this.handleInputChange('confirmPassword', e, setFieldTouched, handleChange('confirmPassword'))} />
                  </Item>
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <Text style={styles.validationMessage}>
                      {errors.confirmPassword}
                    </Text>
                  ) : null}
                  <Item picker>
                    <Picker mode="dropdown" iosIcon={<Icon name="arrow-down" />} style={{ width: undefined }} placeholder="Select your SIM"
                            placeholderStyle={{ color: "#bfc6ea" }} placeholderIconColor="#007aff" selectedValue={this.state.selected2}
                            onValueChange={(e) => this.handleInputChange('countryId', e, setFieldTouched, handleChange('countryId'))}>
                          {this.state.countries.map((item, index) =>
                            <Picker.Item label={item.text} value={item.value} />
                          )}
                    </Picker>
                  </Item>
                  {touched.countryId && errors.countryId ? (
                    <Text style={styles.validationMessage}>
                      {errors.countryId}
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
                    <Text>Login</Text>
                  </Button>
                  <Button light onPress={this.cancel} full disabled={isSubmitting ? 'disabled' : undefined}>
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

export default withRouter(Register);

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

