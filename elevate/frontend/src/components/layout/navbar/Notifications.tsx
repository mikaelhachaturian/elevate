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
import useAuth from '../../../stores/auth';

const apiClient = new BackendAPIClient('/api/notifications');
const apiClientAll = new BackendAPIClient('/api/notifications/all');

const Notifications = () => {
  const { data, error, isLoading, refetch } = useNotifications();
  const userEmail = useAuth((state) => state.session?.data.email);
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="sm" />
      </Center>
    );
  }
  if (error || !data) throw error;

  const deleteNotification = async (requestId: string) => {
    await apiClient.delete(requestId);
    refetch();
  };

  const deleteAllNotification = async () => {
    if (data.notifications.length > 0) {
      await apiClientAll.delete(userEmail!);
      refetch();
    }
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
        <Button size={'xs'} variant="ghost" onClick={deleteAllNotification}>
          Clear All
        </Button>
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
            <Center>
              <Text fontSize={'sm'}>No new Notifications..</Text>
            </Center>
          </PopoverHeader>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
