import { combineReducers } from "redux";
import session from "./session";
import device from "./device";
import login from "../components/login/login-reducer";
import register from "../components/register/register-reducer";
import forgotPassword from "../components/forgot-password/forgot-password-reducer";
import buyData from "../components/buy-data/buy-data-reducer";
import checkout from "../components/checkout/checkout-reducer";


const smartApp = combineReducers({
    session,
    device,
    login,
    register,
    forgotPassword,
    buyData,
    checkout
});

export default smartApp;
