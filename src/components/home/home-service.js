import API from "../../common/axios/api";

const homeService = {
  getDeviceInfo: async () => {
    try {
      const response = await API.get(`Device/GetDeviceInformation`);

      return response.data;
    } catch (error) {
      if (error.status === 422) {
        return error;
      }
    }
  }
};

export default homeService;
