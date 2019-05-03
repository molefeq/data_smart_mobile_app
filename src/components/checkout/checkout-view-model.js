import { SET_CHECKOUT_URL } from "../../common/app-redux/components/checkout/checkout-action-types";
import checkoutService from "./checkout-service";

export const mapStateToProps = (state, ownProps) => {
  return {
    checkout: state.checkout,
    buyData: state.buyData,
    getProcessUrl: ownProps.getProcessUrl,
    handleWebViewNavigationStateChange:
      ownProps.handleWebViewNavigationStateChange
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProcessUrl: async amount => {
      dispatch({ type: SET_CHECKOUT_URL, processUrl: "" });

      const response = await checkoutService.processPayment({ amount: amount });
      dispatch({ type: SET_CHECKOUT_URL, processUrl: response.data.url });
    },
    handleWebViewNavigationStateChange: async (newNavState, webview, amount) => {
      const { url } = newNavState;

      if (!url) return;

      if (url.includes("api/PayFast/Return")) {
        webview.stopLoading();

        await checkoutService.topUpDevice({ amount: amount });

        ownProps.history.push("/home");
      }

      if (url.includes("api/PayFast/Cancel")) {
        webview.stopLoading();
        ownProps.history.push("/home");
      }
    }
  };
};
