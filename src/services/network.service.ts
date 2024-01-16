import { AxiosRequestConfig } from "axios";
import axios from "./axios.service";

class NetworkService {
  private static _instance: NetworkService;

  public static getInstance(): NetworkService {
    if (!NetworkService._instance) {
      NetworkService._instance = new NetworkService();
    }

    return NetworkService._instance;
  }

  get<T>(
    url: string,
    params: any = null,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const axiosConfig = this._prepareRequest(url, config);
    axiosConfig.method = "GET";
    if (params !== null) {
      axiosConfig.params = params;
    }
    return this._getResponse<T>(axiosConfig);
  }

  post<T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
    const axiosConfig = this._prepareRequest(url, config);
    axiosConfig.method = "POST";
    axiosConfig.data = data;
    return this._getResponse<T>(axiosConfig);
  }

  put<T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
    const axiosConfig = this._prepareRequest(url, config);
    axiosConfig.method = "PUT";
    axiosConfig.data = data;
    return this._getResponse<T>(axiosConfig);
  }

  delete<T>(
    url: string,
    params: any = null,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const axiosConfig = this._prepareRequest(url, config);
    axiosConfig.method = "DELETE";
    if (params !== null) {
      axiosConfig.params = params;
    }
    return this._getResponse<T>(axiosConfig);
  }

  private _prepareRequest(
    url: string,
    config: AxiosRequestConfig
  ): AxiosRequestConfig {
    const axiosConfig: AxiosRequestConfig = Object.assign(
      {
        url: url,
      } as Partial<AxiosRequestConfig>,
      config
    );

    return axiosConfig;
  }

  private async _getResponse<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const networkService = NetworkService.getInstance();
export default networkService;
