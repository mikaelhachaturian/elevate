import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BANKS_URL,
});

class BanksAPIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  get = async () => {
    return axiosInstance
      .get<T>(this.endpoint, {
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => res.data);
  };
  post = async (data: unknown) => {
    return axiosInstance
      .post<T>(this.endpoint, data, {
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => res.data);
  };
}

export default BanksAPIClient;
