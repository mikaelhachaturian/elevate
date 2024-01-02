import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://rest.nexmo.com',
});

class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  post = async (data: any) => {
    return axiosInstance
      .post<T>(this.endpoint, data, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => res.data);
  };
}

const sendSMS = async (phone: string, text: string) => {
  const apiClient = new APIClient('/sms/json');
  const to = '972' + phone.substring(1);
  const from = 'Elevate';

  const payload = {
    to,
    from,
    text,
    api_secret: process.env.VONAGE_API_SECRET,
    api_key: process.env.VONAGE_API_KEY,
  };

  // enable when need to
  // await apiClient
  //   .post(payload)
  //   .then((resp) => {
  //     console.log('Message sent successfully');
  //     console.log(resp);
  //   })
  //   .catch((err) => {
  //     console.log('There was an error sending the messages.');
  //     console.error(err);
  //   });
};

export default sendSMS;
