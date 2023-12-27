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
import useProfile from '../../../../hooks/useProfile';
import ColorModeSwitch from './ColorModeSwitch';
import SignOutBtn from './SignOutBtn';

const UserPopUp = () => {
  const profile = useProfile();
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
          <VStack padding={6}>
            <Image
              borderRadius="full"
              boxSize="90px"
              src={profile?.picture}
              alt={profile?.name}
            />
            <PopoverHeader paddingX={'7'}>Hi {profile?.name}!</PopoverHeader>
          </VStack>
          <PopoverBody>
            <ColorModeSwitch />
            <SignOutBtn />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserPopUp;
