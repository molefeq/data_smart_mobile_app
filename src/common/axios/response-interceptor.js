import API from "./api";

import {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED
} from "../app-redux/actions/responseTypes";

export default {
  setupResponseInterceptors: store => {
    // Add a response interceptor
    API.interceptors.response.use(
      response => {
        // Do something with response data
        return response;
      },
      error => {

        console.log(error);

        if (!error.response || !error.response.status) {
          store.dispatch({ type: INTERNAL_SERVER_ERROR });
          return;
        }

        if (error.response.status === 422) {
          return Promise.reject(error.response);
        }

        if (error.response.status === 401) {
          store.dispatch({ type: UNAUTHORIZED });
          return;
        }

        if (error.response.status === 500) {
          store.dispatch({ type: INTERNAL_SERVER_ERROR });
          return;
        }
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }
};
