import React, { Component } from "react";
import { Image, View } from "react-native";
import { Text, Form, Item, Input, Label, Button, Icon } from "native-base";
import { withRouter } from "react-router-native";
import { Formik } from "formik";
import logo from "../../assets/images/logo_white_bg.png"; // Tell Webpack this JS file uses this image
import {initialValues, validationSchema, mapStateToProps, mapDispatchToProps} from './buy-data-view-model'
import { styles } from './buy-data-styles';
import { connect } from "react-redux";

class BuyData extends Component {
  render() {
    const {onBuyDataClick, onInputChange, cancel } = this.props;

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onBuyDataClick}
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
                    <Label>Amount</Label>
                    <Input onChangeText={e => onInputChange("amount", e, setFieldTouched, handleChange("amount"))} />
                  </Item>
                  {touched.amount && errors.amount ? (
                    <Text style={styles.validationMessage}>
                      {errors.amount}
                    </Text>
                  ) : null}
                </Form>
                <View style={styles.buttonsContainer}>
                  <Button onPress={props.handleSubmit} disabled={isSubmitting ? isSubmitting : undefined}><Text> Proceed </Text></Button>
                  <Button onPress={cancel} light disabled={isSubmitting ? isSubmitting : undefined}>
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
)(withRouter(BuyData));
