import API from "./api";

export default {
  setupRequestInterceptors: store => {
    API.interceptors.request.use(
      config => {
        const state = store.getState();
        const token =
          state && state.session && state.session.user
            ? state.session.user.token
            : null;

        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }

        return config;
      },
      error => {
        // Do something with request error

        //store.dispatch({ type: INTERNAL_SERVER_ERROR });
        return Promise.reject(error);
      }
    );
  }
};
