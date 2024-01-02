import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient from '../services/api-client';
import useAuth from '../stores/auth';
import { Profile } from '../stores/googleProfile';

const apiClient = new APIClient<Profile>('/api/users');

const useProfile = () => {
  const data = useAuth((state) => state.session?.data);
  return useQuery({
    queryKey: ['profile', data],
    queryFn: () => apiClient.get(data?.email as string),
    staleTime: ms('24h'),
  });
};

export default useProfile;
