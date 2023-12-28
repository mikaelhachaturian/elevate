import axios from 'axios';
import { Credentials } from 'google-auth-library';

export const getGoogleProfile = async (tokens: Credentials) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log(
        'Error 401: Unauthorized | need to login to Google Again. Redirecting to /login.'
      );
    } else {
      console.log(error);
    }
  }
};
