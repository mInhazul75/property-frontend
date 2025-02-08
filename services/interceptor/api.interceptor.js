import axios from "axios";
const apiBaseUrl = process.env.NEXT_API_URL || "http://localhost:3000";
import Cookies from "js-cookie";
const api = axios.create({
  baseURL: apiBaseUrl,
});

const authApi = axios.create({
  baseURL: apiBaseUrl,
});

authApi.interceptors.request.use(
  async (config) => {
    const authToken = Cookies.get("access_token"); 

    config.headers = config.headers || {};

    if (authToken) {
      config.headers.token = `${authToken}`;
    }

    return config;
  },
  (err) => {
    console.error("Error in request interceptor:", err);
    return Promise.reject(err);
  }
);

export { api, authApi };
