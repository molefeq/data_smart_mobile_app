import { SET_BUY_DATA_AMOUNT } from "../../common/app-redux/components/buy-data/buy-data-action-types";
import * as Yup from "yup";

export const initialValues = {
  amount: ""
};

export const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required.")
});

export const mapStateToProps = (state, ownProps) => {
  return {
    buyData: state.buyData,
    onBuyDataClick: ownProps.onBuyDataClick,
    onInputChange: ownProps.onInputChange,
    cancel: ownProps.cancel
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBuyDataClick: async (
      values,
      { props = this.props, resetForm, setErrors, setSubmitting }
    ) => {
      setSubmitting(false);
      dispatch({ type: SET_BUY_DATA_AMOUNT, amount: values.amount });
      ownProps.history.push("/checkout");
    },
    onInputChange: (name, e, setFieldTouched, handleChange) => {
      handleChange(e);
      setFieldTouched(name, true);
    },
    cancel: () => {
      ownProps.history.push("/home");
    }
  };
};
