import { SET_LOGIN_VALIDATION_MESSAGES } from "./login-action-types";

const initialState = {
  validationMessages: []
};

function login(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_VALIDATION_MESSAGES:
      return Object.assign({}, state, {
        validationMessages: action.validationMessages
      });
    default:
      return state;
  }
}

export default login;
