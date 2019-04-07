import API from "../../common/axios/api";
import authenticationService from "../../shared/services/authentication-service/authentication-service";

const loginService = {
  login: async model => {
    // Promise is resolved and value is inside of the response const.
    try {
      const response = await API.post(`Account/Login`, model);

      await authenticationService.authenticate(response);

      return response;
    } catch (error) {
      if (error.status === 422) {
        return error;
      }
    }
  }
};

export default loginService;
