import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import BackendAPIClient from '../services/api-client';
import useAuth from '../stores/auth';

interface Appointment {
  with: string;
  by: string;
  date: string;
  text: string;
}

interface Appointments {
  appointments: Appointment[];
}

const apiClient = new BackendAPIClient<Appointments>('/api/appointments');

const useAppointments = () => {
  const email = useAuth((state) => state.session?.data.email);
  return useQuery({
    queryKey: ['appointments'],
    queryFn: () => apiClient.get(email as string),
    staleTime: ms('1s'),
    refetchOnWindowFocus: true,
  });
};

export default useAppointments;
