import API from "./api";
import authenticationService from "../authentication-service/authentication-service";

API.interceptors.request.use(
  config => {
    const token = authenticationService.getToken();

    if (token) {
      config["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);
