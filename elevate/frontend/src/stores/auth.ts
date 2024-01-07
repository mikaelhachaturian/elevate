import { create } from 'zustand';
import BackendAPIClient from '../services/api-client';

interface SessionInfo {
  id_token: string;
  email: string;
  expiry_date: number;
  role: string;
}

interface Session {
  isAuthenticated: boolean;
  data: SessionInfo;
}

interface Auth {
  session: Session | undefined;
  signIn: (tokens: SessionInfo) => void;
  signOut: (userEmail: string) => void;
}

const apiClient = new BackendAPIClient('/api/users');

const localStorageHandler = (): Session | undefined => {
  const v = localStorage.getItem('session') || undefined;
  return v ? (JSON.parse(v) as Session) : undefined;
};

const useAuth = create<Auth>((set) => ({
  session: localStorageHandler(),
  signIn: (tokens: SessionInfo) =>
    set(() => {
      const session = {
        data: tokens,
        isAuthenticated: true,
      };
      localStorage.setItem('session', JSON.stringify(session));
      return { session: session };
    }),
  signOut: (userEmail: string) =>
    set(() => {
      localStorage.removeItem('session');
      apiClient.delete(userEmail);
      return { session: undefined };
    }),
}));

export default useAuth;
