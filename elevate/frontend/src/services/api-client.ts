import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = async () => {
    return axiosInstance
      .get<T>(this.endpoint, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => res.data);
  };
  get = async (id: string) => {
    return axiosInstance
      .get<T>(this.endpoint + '/' + id, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => res.data);
  };
  delete = async (id: string) => {
    return axiosInstance
      .delete<T>(this.endpoint + '/' + id, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => res.data);
  };
  post = async (data: unknown) => {
    return axiosInstance
      .post<T>(this.endpoint, data, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => res.data);
  };
}

export default APIClient;
