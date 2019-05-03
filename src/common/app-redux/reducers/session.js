import {
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST
} from "../actions/responseTypes";
import {
  AUTHENTICATED_USER,
  UNAUTHENTICATED_USER
} from "../actions/authenticationTypes";

import { RESET } from "../actions/actionTypes";

const initialState = {
  isRequestAuthorized: true,
  isInternalServerError: false,
  isRequestNotFound: false,
  isBadRequest: false,
  isUserAuthenticated: false,
  user: null
};

function session(state = initialState, action) {
  switch (action.type) {
    case UNAUTHORIZED:
      return Object.assign({}, state, {
        isRequestAuthorized: false,
        isInternalServerError: false,
        isRequestNotFound: false,
        isBadRequest: false
      });
    case INTERNAL_SERVER_ERROR:
      return Object.assign({}, state, {
        isRequestAuthorized: true,
        isInternalServerError: true,
        isRequestNotFound: false,
        isBadRequest: false
      });
    case NOT_FOUND:
      return Object.assign({}, state, {
        isRequestAuthorized: true,
        isInternalServerError: false,
        isRequestNotFound: true,
        isBadRequest: false
      });
    case BAD_REQUEST:
      return Object.assign({}, state, {
        isRequestAuthorized: true,
        isInternalServerError: false,
        isRequestNotFound: false,
        isBadRequest: true
      });
    case BAD_REQUEST:
      return Object.assign({}, state, {
        isRequestAuthorized: true,
        isInternalServerError: false,
        isRequestNotFound: false,
        isBadRequest: true
      });
    case AUTHENTICATED_USER:
      return Object.assign({}, state, {
        isRequestAuthorized: true,
        isInternalServerError: false,
        isRequestNotFound: false,
        isBadRequest: false,
        isUserAuthenticated: true,
        user: action.data
      });
    case UNAUTHENTICATED_USER:
      return Object.assign({}, state, {
        isRequestAuthorized: true,
        isInternalServerError: false,
        isRequestNotFound: false,
        isBadRequest: false,
        isUserAuthenticated: false
      });
    case RESET:
      return Object.assign({}, state, {
        isRequestAuthorized: true,
        isInternalServerError: false,
        isRequestNotFound: false,
        isBadRequest: false
      });
    default:
      return state;
  }
}

export default session;
