import API from "../../common/axios/api";

const checkoutService = {
  processPayment: async model => {
    // Promise is resolved and value is inside of the response const.
    try {
      const response = await API.post(`PayFast/OnceOffPayment`, model);

      return response;
    } catch (error) {
      console.log(error);
    }
  },
  topUpDevice: async model => {
    // Promise is resolved and value is inside of the response const.
    try {
      const response = await API.post(`Device/TopUpDevice`, model);

      return response;
    } catch (error) {
      console.log(error);
    }
  }
};

export default checkoutService;
