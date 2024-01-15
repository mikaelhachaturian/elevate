import {
  Button,
  Center,
  HStack,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { IoIosNotifications } from 'react-icons/io';
import useNotifications from '../../../hooks/useNotifications';

const Notifications = () => {
  const { data, error, isLoading } = useNotifications();
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="sm" />
      </Center>
    );
  }
  if (error || !data) throw error;

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
        {data.notifications.length > 0 ? (
          data.notifications?.map((notification, index) => (
            <PopoverHeader key={index}>
              <HStack>
                <Text fontSize={'sm'}>
                  You have a new update for request: {notification.requestId}.
                </Text>
                <Button size={'xs'} variant="ghost">
                  X
                </Button>
              </HStack>
            </PopoverHeader>
          ))
        ) : (
          <PopoverHeader>
            <Text fontSize={'sm'}>No new Notifications..</Text>
          </PopoverHeader>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
