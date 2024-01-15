import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import BackendAPIClient from '../services/api-client';
import useAuth from '../stores/auth';

interface Notification {
  email: string;
  status: string;
  requestId: string;
}

export interface Notifications {
  notifications: Notification[];
}

const apiClient = new BackendAPIClient<Notifications>('/api/notifications');

const useNotifications = () => {
  const email = useAuth((state) => state.session?.data.email);
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => apiClient.get(email as string),
    staleTime: ms('5s'),
    refetchOnWindowFocus: 'always',
  });
};

export default useNotifications;
