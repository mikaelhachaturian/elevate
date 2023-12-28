import axios, { AxiosError, AxiosResponse } from 'axios';
import useAuth from '../stores/auth';
import useGoogleProfile from '../stores/googleProfile';

const useProfile = () => {
  const data = useAuth((state) => state.session?.data);
  const { profile, setProfile } = useGoogleProfile((state) => state);
  if (data) {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            Accept: 'application/json',
          },
        }
      )
      .then((res: AxiosResponse) => {
        setProfile(res.data);
      })
      .catch((error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          console.log(
            'Error 401: Unauthorized | need to login to Google Again. Redirecting to /login.'
          );
          setProfile(undefined);
        } else {
          console.log(error);
        }
      });
  }
  return profile;
};

export default useProfile;
