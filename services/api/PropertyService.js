import { authApi } from "../interceptor/api.interceptor";
const apiPrefix = process.env.NEXT_API_PREFIX || "api";

class PropertyService {
  static async createProperty(formData) {
    return await authApi
      .post(`/${apiPrefix}/property`, formData)
      .then((response) => response?.data?.data);
  }

  static async getPropertyItems(page) {
    return await authApi
      .get(`/${apiPrefix}/property`, { params: { page } })
      .then((response) => response?.data);
  }

  static async getPropertyItem(ID) {
    return await authApi
      .get(`/${apiPrefix}/products/${ID}`)
      .then((response) => response?.data?.data);
  }

  static async updateProperty(formData) {
    return await authApi
      .put(`/${apiPrefix}/property`, formData)
      .then((response) => response?.data?.data);
  }

  static async deleteProperty(formData) {
    return await authApi
      .delete(`/${apiPrefix}/property`, { data: formData })
      .then((response) => response?.data?.data);
  }
}

export default PropertyService;
