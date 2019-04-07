import API from "../../shared/services/api";

const forgotPasswordService = {
  resetPassword: async username => {
    // Promise is resolved and value is inside of the response const.
    try {
      return await API.post(`Account/ResetPasswordRequest/${username}`);
    } catch (error) {
      if (error.status === 422) {
        return error;
      }
    }
  }
};

export default forgotPasswordService;
