import registerService from "./register-service";
import {
  SET_REGISTER_VALIDATION_MESSAGES,
  SET_REGISTER_COUNTRIES
} from "../../common/app-redux/components/register/register-action-types";
import * as Yup from "yup";

export const initialValues = {
  emailAddress: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  countryId: ""
};

export const validationSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .email("Username must be a valid email address.")
    .required("Username is required."),
  firstName: Yup.string().required("FirstName is required."),
  lastName: Yup.string().required("LastName is required."),
  password: Yup.string()
    .min(8, "Password cannot be shorted than 8 characters.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Confirm Password must match Password.")
    .min(8, "Confirm Password cannot be shorted than 8 characters.")
    .required("Confirm Password is required."),
  countryId: Yup.string().required("Country is required.")
});

export const mapStateToProps = (state, ownProps) => {
  return {
    register: state.register,
    onRegisterClick: ownProps.onRegisterClick,
    onInputChange: ownProps.onInputChange,
    cancel: ownProps.cancel,
    handleDropdownChange: ownProps.handleDropdownChange,
    getCountries: ownProps.getCountries
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRegisterClick: async (
      values,
      { props = this.props, resetForm, setErrors, setSubmitting }
    ) => {
      dispatch({
        type: SET_REGISTER_VALIDATION_MESSAGES,
        validationMessages: []
      });

      var response = await registerService.register(values);
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
          type: SET_REGISTER_VALIDATION_MESSAGES,
          validationMessages: validationMessages
        });
      }
    },
    onInputChange: (name, e, setFieldTouched, handleChange) => {
      dispatch({
        type: SET_REGISTER_VALIDATION_MESSAGES,
        validationMessages: []
      });
      handleChange(e);
      setFieldTouched(name, true);
    },
    cancel: () => {
      ownProps.history.push("/login");
    },
    handleDropdownChange: (e, { value }, setFieldValue, name) => {
      dispatch({
        type: SET_REGISTER_VALIDATION_MESSAGES,
        validationMessages: []
      });
      setFieldValue(name, value, true);
    },
    getCountries: async () => {
      const countries = await registerService.countries();
      dispatch({ type: SET_REGISTER_COUNTRIES, countries: countries });
    }
  };
};
