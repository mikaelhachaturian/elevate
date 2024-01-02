import { create } from 'zustand';
import APIClient from '../services/api-client';

interface Tokens {
  id_token: string;
  email: string;
  expiry_date: number;
}

interface Session {
  isAuthenticated: boolean;
  data: Tokens;
}

interface Auth {
  session: Session | undefined;
  signIn: (tokens: Tokens) => void;
  signOut: (userEmail: string) => void;
}

const apiClient = new APIClient('/api/users');

const localStorageHandler = (): Session | undefined => {
  const v = localStorage.getItem('session') || undefined;
  return v ? (JSON.parse(v) as Session) : undefined;
};

const useAuth = create<Auth>((set) => ({
  session: localStorageHandler(),
  signIn: (tokens: Tokens) =>
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
