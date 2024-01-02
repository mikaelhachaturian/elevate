import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient from '../services/api-client';
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

const apiClient = new APIClient<Appointments>('/api/appointments');

const useAppointments = () => {
  const email = useAuth((state) => state.session?.data.email);
  return useQuery({
    queryKey: ['appointments'],
    queryFn: () => apiClient.get(email as string),
    staleTime: ms('5s'),
    refetchOnWindowFocus: true,
  });
};

export default useAppointments;
