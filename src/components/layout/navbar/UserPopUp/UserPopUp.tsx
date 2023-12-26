import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';
import ColorModeSwitch from './ColorModeSwitch';
import SignOutBtn from './SignOutBtn';

const UserPopUp = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button bg={'#DDD8C3'}>User</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>User Name and Pic</PopoverHeader>
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
