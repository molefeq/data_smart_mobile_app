import API from "../../common/axios/api";

const registerService = {
  register: async model => {
    try {
      return await API.post(`Account/Register`, model);
    } catch (error) {
      if (error.status === 422) {
        return error;
      }
    }
  },
  countries: async () => {
    const response = await API.get(`ReferenceData/GetCountries`);
    
    return response.data.map(item => {
      return { key: item.id, value: item.id, text: item.name };
    });
  }
};

export default registerService;
