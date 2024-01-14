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
import { useNavigate } from 'react-router-dom';
import useProfile from '../../../../hooks/useProfile';
import useAuth from '../../../../stores/auth';
import ColorModeSwitch from './ColorModeSwitch';
import SignOutBtn from './SignOutBtn';

const UserPopUp = () => {
  const { data: profile, error } = useProfile();
  const signOut = useAuth((state) => state.signOut);
  const userEmail = useAuth((state) => state.session?.data.email);
  const navigate = useNavigate();

  if (error) {
    signOut(userEmail as string);
    navigate('/login');
  }

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
