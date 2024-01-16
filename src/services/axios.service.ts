import axios from "axios";

import appConstants from "../shared/config";
import { requestInterceptor, responseInterceptor } from "./interceptors";

const axiosInstance = axios.create({
  baseURL: `${appConstants.urls.baseUrl}`,
});

// setup request interceptor
axiosInstance.interceptors.request.use(requestInterceptor);

// setup response interceptor
axiosInstance.interceptors.response.use(undefined, responseInterceptor);

// export the axios instance
export default axiosInstance;
