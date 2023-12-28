import { create } from 'zustand';

interface Tokens {
  id_token: string;
  expiry_date: number;
}

interface Session {
  isAuthenticated: boolean;
  data: Tokens;
}

interface Auth {
  session: Session | undefined;
  signIn: (tokens: Tokens) => void;
  signOut: () => void;
}

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
  signOut: () =>
    set(() => {
      localStorage.removeItem('session');
      return { session: undefined };
    }),
}));

export default useAuth;
