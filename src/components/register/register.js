import React, { Component } from "react";
import { withRouter } from "react-router-native";
import { Text, Form, Item, Input, Label, Button,Picker, Icon } from 'native-base';
import { Formik } from "formik";
import logo from '../../assets/images/logo_white_bg.png'; // Tell Webpack this JS file uses this image
import { Image, View } from 'react-native';
import {styles} from "./register-sytles";
import { connect } from "react-redux";
import {initialValues, validationSchema, mapStateToProps, mapDispatchToProps} from './register-view-model'

class Register extends Component {  
  componentDidMount = async() => {
    await this.props.getCountries();
  }

  render() {
    const { register, onRegisterClick, onInputChange, cancel, handleDropdownChange } = this.props;

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onRegisterClick}
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
                    <Input onChangeText={(e) => onInputChange('emailAddress', e, setFieldTouched, handleChange('emailAddress'))} />
                  </Item>
                  {touched.emailAddress && errors.emailAddress ? (
                    <Text style={styles.validationMessage}>
                      {errors.emailAddress}
                    </Text>
                  ) : null}
                  <Item stackedLabel>
                    <Label>FirstName</Label>
                    <Input onChangeText={(e) => onInputChange('firstName', e, setFieldTouched, handleChange('firstName'))} />
                  </Item>
                  {touched.firstName && errors.firstName ? (
                    <Text style={styles.validationMessage}>
                      {errors.firstName}
                    </Text>
                  ) : null}
                  <Item stackedLabel>
                    <Label>LastName</Label>
                    <Input onChangeText={(e) => onInputChange('lastName', e, setFieldTouched, handleChange('lastName'))} />
                  </Item>
                  {touched.lastName && errors.lastName ? (
                    <Text style={styles.validationMessage}>
                      {errors.lastName}
                    </Text>
                  ) : null}
                  <Item stackedLabel>
                    <Label>Password</Label>
                    <Input secureTextEntry={true}
                           onChangeText={(e) => onInputChange('password', e, setFieldTouched, handleChange('password'))} />
                  </Item>
                  {touched.password && errors.password ? (
                    <Text style={styles.validationMessage}>
                      {errors.password}
                    </Text>
                  ) : null}
                  <Item stackedLabel>
                    <Label>Confirm Password</Label>
                    <Input secureTextEntry={true}
                           onChangeText={(e) => onInputChange('confirmPassword', e, setFieldTouched, handleChange('confirmPassword'))} />
                  </Item>
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <Text style={styles.validationMessage}>
                      {errors.confirmPassword}
                    </Text>
                  ) : null}
                  <Item picker>
                    <Picker mode="dropdown" iosIcon={<Icon name="arrow-down" />} style={{ width: undefined }} placeholder="Select country"
                            placeholderStyle={{ color: "#bfc6ea" }} placeholderIconColor="#007aff" selectedValue={values.countryId}
                            onValueChange={(e) => onInputChange('countryId', e, setFieldTouched, handleChange('countryId'))}>
                          {register.countries.map((item, index) =>
                            <Picker.Item label={item.text} value={item.value} key={index} />
                          )}
                    </Picker>
                  </Item>
                  {touched.countryId && errors.countryId ? (
                    <Text style={styles.validationMessage}>
                      {errors.countryId}
                    </Text>
                  ) : null}
                  {register.validationMessages && register.validationMessages.length ?  
                    register.validationMessages.map((item, key) => (
                        <Text key={key} style={styles.validationMessage}>
                          {item}
                        </Text>
                      ))
                    : null}
                </Form>
                <View style={styles.loginContainer}>
                  <Button onPress={props.handleSubmit} full 
                          disabled={isSubmitting ? isSubmitting : undefined}
                          style={styles.loginButton}>
                    <Text>Register</Text>
                  </Button>
                  <Button light onPress={cancel} full disabled={isSubmitting ? isSubmitting : undefined}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
