import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient from '../services/api-client';

export interface Provider {
  name: string;
  cost: string;
  picture: string;
  description: string;
  work_times: string;
  phone: string;
}

interface Providers {
  providers: Provider[];
}

const apiClient = new APIClient<Providers>('/api/thirdparty');

const useThirdParties = () => {
  return useQuery({
    queryKey: ['thirdParties'],
    queryFn: () => apiClient.getAll(),
    staleTime: ms('24h'),
  });
};

export default useThirdParties;
