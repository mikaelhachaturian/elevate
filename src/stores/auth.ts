import { create } from 'zustand';

interface Auth {
  is_authenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const localStorageHandler = (): boolean => {
  const v = localStorage.getItem('is_authenticated') || false;
  return v ? (JSON.parse(v) as boolean) : false;
};

const useAuth = create<Auth>((set) => ({
  is_authenticated: localStorageHandler(),
  signIn: () =>
    set((state) => {
      localStorage.setItem(
        'is_authenticated',
        JSON.stringify(!state.is_authenticated)
      );
      return { is_authenticated: true };
    }),
  signOut: () =>
    set(() => {
      localStorage.removeItem('is_authenticated');
      return { is_authenticated: false };
    }),
}));

export default useAuth;
