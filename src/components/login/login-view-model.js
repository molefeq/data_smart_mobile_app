import loginService from "./login-service";
import authenticationService from "../../shared/services/authentication-service/authentication-service";
import { SET_LOGIN_VALIDATION_MESSAGES } from "../../common/app-redux/components/login/login-action-types";
import { AUTHENTICATED_USER } from "../../common/app-redux/actions/authenticationTypes";
import * as Yup from "yup";

export const initialValues = {
  username: "molefeq@gmail.com",
  password: "Manbehind5"
};

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Username must be a valid email address.")
    .required("Username is required."),
  password: Yup.string()
    .min(8, "Password cannot be shorted than 8 characters.")
    .required("Password is required.")
});

export const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login,
    onLoginClick: ownProps.onLoginClick,
    onInputChange: ownProps.onInputChange,
    goToLocation: ownProps.goToLocation
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoginClick: async (
      values,
      { props = this.props, resetForm, setErrors, setSubmitting }
    ) => {
      dispatch({ type: SET_LOGIN_VALIDATION_MESSAGES, validationMessages: [] });

      var response = await loginService.login(values);
      setSubmitting(false);

      if (response.status === 200) {
        await authenticationService.authenticate(response.data);
        dispatch({ type: AUTHENTICATED_USER, data: response.data });
        ownProps.history.push("/home");
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

        dispatch({
          type: SET_LOGIN_VALIDATION_MESSAGES,
          validationMessages: validationMessages
        });
      }
    },
    onInputChange: (name, e, setFieldTouched, handleChange) => {
      dispatch({ type: SET_LOGIN_VALIDATION_MESSAGES, validationMessages: [] });
      handleChange(e);
      setFieldTouched(name, true);
    },
    goToLocation: path => {
      ownProps.history.push(path);
    }
  };
};
