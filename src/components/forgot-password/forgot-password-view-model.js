import * as Yup from "yup";
import forgotPasswordService from "./forgot-password-service";
import { SET_FORGOT_PASSWORD_VALIDATATION_MESSAGES } from "../../common/app-redux/components/forgot-password/forgot-password-action-types";

export const initialValues = {
  username: ""
};

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Username must be a valid email address.")
    .required("Username is required.")
});

export const mapStateToProps = (state, ownProps) => {
  return {
    forgotPassword: state.forgotPassword,
    onForgotPasswordClick: ownProps.onForgotPasswordClick,
    onInputChange: ownProps.onInputChange,
    goToLocation: ownProps.goToLocation
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onForgotPasswordClick: async (
      values,
      { props = this.props, resetForm, setErrors, setSubmitting }
    ) => {
      dispatch({ type: SET_FORGOT_PASSWORD_VALIDATATION_MESSAGES, validationMessages: [] });

      var response = await forgotPasswordService.resetPassword(values.username);
      setSubmitting(false);

      if (response.status === 200) {
        ownProps.history.push("/login");
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
          type: SET_FORGOT_PASSWORD_VALIDATATION_MESSAGES,
          validationMessages: validationMessages
        });
      }
    },
    onInputChange: (name, e, setFieldTouched, handleChange) => {
      dispatch({ type: SET_FORGOT_PASSWORD_VALIDATATION_MESSAGES, validationMessages: [] });
      handleChange(e);
      setFieldTouched(name, true);
    },
    goToLocation: path => {
      ownProps.history.push(path);
    }
  };
};
