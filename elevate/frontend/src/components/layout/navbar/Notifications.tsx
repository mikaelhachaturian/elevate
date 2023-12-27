import {
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { IoIosNotifications } from 'react-icons/io';

const Notifications = () => {
  return (
    <Popover placement="right-end">
      <PopoverTrigger>
        <Button
          color={'#DDD8C3'}
          colorScheme={'whiteAlpha'}
          leftIcon={<IoIosNotifications />}
          size="sm"
          variant={'ghost'}
        >
          Notifications
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Notifications</PopoverHeader>
        <PopoverHeader>Notifications</PopoverHeader>
        <PopoverHeader>Notifications</PopoverHeader>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
