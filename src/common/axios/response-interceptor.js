import API from "./api";

// Add a response interceptor
API.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => {
    if (!error.response || !error.response.status) {
      window.location.href = "/error";
      return;
    }

    if (error.response.status === 422) {
      return Promise.reject(error.response);
    }

    if (error.response.status === 401) {
      window.location.href = "/login";
      return;
    }

    if (error.response.status === 500) {
      window.location.href = "/error";
      return;
    }
    // Do something with response error
    return Promise.reject(error);
  }
);
