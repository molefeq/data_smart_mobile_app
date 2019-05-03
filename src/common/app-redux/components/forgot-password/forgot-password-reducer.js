import { SET_FORGOT_PASSWORD_VALIDATATION_MESSAGES } from "./forgot-password-action-types";

const initialState = {
  validationMessages: []
};

function forgotPassword(state = initialState, action) {
  switch (action.type) {
    case SET_FORGOT_PASSWORD_VALIDATATION_MESSAGES:
      return Object.assign({}, state, {
        validationMessages: action.validationMessages
      });
    default:
      return state;
  }
}

export default forgotPassword;
