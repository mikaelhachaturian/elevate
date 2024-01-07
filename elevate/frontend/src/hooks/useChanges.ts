import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import BackendAPIClient from '../services/api-client';
import useAuth from '../stores/auth';

interface DoorSpec {
  color: string;
  handle: string;
  light: string;
}

interface Change {
  email: string;
  type: string;
  description: DoorSpec;
  cost: string;
  approved: boolean;
  changeRequestId: string;
  changedStatus: boolean;
}

export interface Changes {
  changes: Change[];
}

const apiClient = new BackendAPIClient<Changes>('/api/changes');

const useChanges = () => {
  const email = useAuth((state) => state.session?.data.email);
  return useQuery({
    queryKey: ['changes'],
    queryFn: () => apiClient.get(email as string),
    staleTime: ms('5s'),
    refetchOnWindowFocus: 'always',
  });
};

export default useChanges;
