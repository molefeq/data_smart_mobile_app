import homeService from "./home-service";
import { DEVICE_FETCHED } from "../../common/app-redux/actions/deviceActionTypes";

export const mapStateToProps = (state, ownProps) => {
  return {
    session: state.session,
    device: state.device,
    buyData: ownProps.buyData,
    linkDevice: ownProps.linkDevice,
    getDevice: ownProps.getDevice
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    buyData: () => {
      ownProps.history.push("/buy-data");
    },
    linkDevice: async () => {
      ownProps.history.push("/link-device");
    },
    getDevice: async () => {
      const device = await homeService.getDeviceInfo();
      
      dispatch({ type: DEVICE_FETCHED, data: device });
    }
  };
};
