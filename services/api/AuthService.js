import { api, authApi } from "../interceptor/api.interceptor";

const apiPrefix = process.env.NEXT_API_PREFIX || "api";

class AuthService {

  static async login(credentials) {
    return await api
      .post(`/${apiPrefix}/signin`, credentials)
      .then((response) => {
        return response?.data;
      });
  }

  static async register(credentials) {
    return await api
      .post(`/${apiPrefix}/register`, credentials)
      .then((response) => {
        return response?.data;
      });
  }
  

    static async profileUpdate(credentials) {
    return await authApi
      .post(`/${apiPrefix}/profileUpdate`, credentials)
      .then((response) => {
        return response?.data;
      });
  }
  

}

export default AuthService;
