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
import BackendAPIClient from '../../../services/api-client';

const apiClient = new BackendAPIClient('/api/notifications');

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

  const deleteNotification = async (requestId: string) => {
    console.log('deleted', requestId);
    await apiClient.delete(requestId);
  };

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
                <Button
                  size={'xs'}
                  variant="ghost"
                  onClick={() => deleteNotification(notification.requestId)}
                >
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
