import { SET_BUY_DATA_AMOUNT } from "./buy-data-action-types";

const initialState = {
  amount: null
};

function buyData(state = initialState, action) {
  switch (action.type) {
    case SET_BUY_DATA_AMOUNT:
      return Object.assign({}, state, {
        amount: action.amount
      });
    default:
      return state;
  }
}

export default buyData;
