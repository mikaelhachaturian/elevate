import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import BackendAPIClient from '../services/api-client';
import { Changes } from './useChanges';

const apiClient = new BackendAPIClient<Changes>('/api/changes');

const useAllChanges = () => {
  return useQuery({
    queryKey: ['changes'],
    queryFn: () => apiClient.getAll(),
    staleTime: ms('1s'),
    refetchOnWindowFocus: 'always',
  });
};

export default useAllChanges;
