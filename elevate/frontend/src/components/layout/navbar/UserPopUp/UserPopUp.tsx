import {
  Button,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react';
import ColorModeSwitch from './ColorModeSwitch';
import SignOutBtn from './SignOutBtn';
import { useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import useAuth from '../../../../stores/auth';
import useGoogleProfile from '../../../../stores/googleProfile';

const UserPopUp = () => {
  const { profile, setProfile } = useGoogleProfile((state) => state);
  const data = useAuth((state) => state.session?.data);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (data) {
      axios
        .get(`${backendURL}/api/users`, {
          params: { id_token: data.id_token },
          headers: {
            Accept: 'application/json',
          },
        })
        .then((res: AxiosResponse) => {
          const { name, given_name, email, picture } = res.data;
          setProfile({ name, given_name, email, picture });
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    }
  }, [data, backendURL, setProfile]);

  return (
    <>
      <Popover placement="right-end">
        <PopoverTrigger>
          <Button
            size="sm"
            bg={'#DDD8C3'}
            color={'#3E373D'}
            leftIcon={
              <Image
                borderRadius="full"
                boxSize="25px"
                src={profile?.picture}
                alt={profile?.name}
              />
            }
          >
            {profile?.given_name}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <VStack padding={2}>
            <Image
              borderRadius="full"
              boxSize="85px"
              src={profile?.picture}
              alt={profile?.name}
            />
            <PopoverHeader>Hi {profile?.name}!</PopoverHeader>
            <PopoverBody>
              <ColorModeSwitch />
              <SignOutBtn />
            </PopoverBody>
          </VStack>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserPopUp;
