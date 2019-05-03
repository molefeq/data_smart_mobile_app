import { SET_REGISTER_VALIDATION_MESSAGES, SET_REGISTER_COUNTRIES } from "./register-action-types";

const initialState = {
  validationMessages: [],
  countries: []
};

function register(state = initialState, action) {
  switch (action.type) {
    case SET_REGISTER_VALIDATION_MESSAGES:
      return Object.assign({}, state, {
        validationMessages: action.validationMessages
      });
      case SET_REGISTER_COUNTRIES:
        return Object.assign({}, state, {
          countries: action.countries
        });
    default:
      return state;
  }
}

export default register;
