import { authApi } from "../interceptor/api.interceptor";
const apiPrefix = process.env.NEXT_API_PREFIX || "api";

class HotelService {
  static async createHotel(formData) {
    return await authApi
      .post(`/${apiPrefix}/hotels`, formData)
      .then((response) => response?.data);
  }

  static async getHotels(page) {
    return await authApi
      .get(`/${apiPrefix}/hotels`, { params: { page } })
      .then((response) => response?.data);
  }

  static async getHotelItem(ID) {
    return await authApi
      .get(`/${apiPrefix}/products/${ID}`)
      .then((response) => response?.data?.data);
  }

  static async updateHotel(formData) {
    return await authApi
      .put(`/${apiPrefix}/hotels`, formData)
      .then((response) => response?.data?.data);
  }

  static async deleteHotel(formData) {
    return await authApi
      .delete(`/${apiPrefix}/hotels`,{ data: formData })
      .then((response) => response?.data?.data);
  }
}

export default HotelService;
