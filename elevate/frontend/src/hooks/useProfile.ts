import useAuth from '../stores/auth';
import axios from 'axios';
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
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.log(err));
  }
  return profile;
};

export default useProfile;
