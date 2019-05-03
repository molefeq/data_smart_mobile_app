import API from "../../common/axios/api";

const linkDeviceService = {
    linkDevice: async model => {
        try {
            return await API.post(`Device/LinkDevice`, model);
        } catch (error) {
            if (error.status === 422) {
                return error;
            }
        }
    }
};

export default linkDeviceService;
