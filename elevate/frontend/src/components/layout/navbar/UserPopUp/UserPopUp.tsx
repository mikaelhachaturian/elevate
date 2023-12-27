import {
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import useProfile from '../../../../hooks/useProfile';
import ColorModeSwitch from './ColorModeSwitch';
import SignOutBtn from './SignOutBtn';

const UserPopUp = () => {
  const profile = useProfile();
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Image
            borderRadius="full"
            boxSize="75px"
            src={profile?.picture}
            alt={profile?.name}
            _hover={{
              transform: 'scale(1.04)',
              transition: 'transform .15s ease-in',
            }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Hi {profile?.name}!</PopoverHeader>
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
