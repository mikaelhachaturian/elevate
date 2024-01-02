import axios, { AxiosRequestConfig } from 'axios';

export interface FetchResponse<T> {
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  get = (id: string) => {
    return axiosInstance
      .get<T>(this.endpoint + '/' + id, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => res.data);
  };
}

export default APIClient;
