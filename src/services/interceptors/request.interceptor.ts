import { InternalAxiosRequestConfig } from "axios";

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // add your request interceptor logic here (e.g. adding headers, bearer tokens, etc.)
  return config;
};

export default requestInterceptor;
