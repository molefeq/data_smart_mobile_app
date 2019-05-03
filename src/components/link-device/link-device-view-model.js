import queryString from "query-string";
import linkDeviceService from "./link-device-service";

export const mapStateToProps = (state, ownProps) => {
  return {
    readQrCode: ownProps.readQrCode,
    cancel: ownProps.cancel
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    readQrCode: async e => {
      const parsedUrl = queryString.parseUrl(e.data);

      await linkDeviceService.linkDevice({
        "serialNumber": parsedUrl.query.imei,
        "terminalPassword": parsedUrl.query.pwd
      });

      ownProps.history.push("/home");
    },
    cancel: () => {
      ownProps.history.push("/home");
    }
  };
};
