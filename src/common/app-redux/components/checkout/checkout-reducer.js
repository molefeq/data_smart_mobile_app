import { SET_CHECKOUT_URL } from "./checkout-action-types";

const initialState = {
  processUrl: null
};

function checkout(state = initialState, action) {
  switch (action.type) {
    case SET_CHECKOUT_URL:
      return Object.assign({}, state, {
        processUrl: action.processUrl
      });
    default:
      return state;
  }
}

export default checkout;
