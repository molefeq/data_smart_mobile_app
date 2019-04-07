import API from "../../shared/services/api";

const registerService = {
  register: async model => {
    try {
      // Promise is resolved and value is inside of the response const.
      const response = await API.post(`Account/Register`, model);

      console.log(response);
      console.log(response.data);

      return response;
    } catch (error) {
      if (error.status === 422) {
        return error;
      }
    }
  },
  countries: async () => {
    // Promise is resolved and value is inside of the response const.
    const response = await API.get(`ReferenceData/GetCountries`);

    return response.data.map(item => {
      return { key: item.id, value: item.id, text: item.name };
    });
  }
};

export default registerService;
