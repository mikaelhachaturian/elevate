import { create } from 'zustand';

interface Auth {
  is_authenticated: boolean;
  updateAuth: () => void;
}

const localStorageHandler = (): boolean => {
  const v = localStorage.getItem('is_authenticated') || false;
  return v ? (JSON.parse(v) as boolean) : false;
};

const useAuth = create<Auth>((set) => ({
  is_authenticated: localStorageHandler(),
  updateAuth: () =>
    set((state) => {
      console.log('changing auth to ' + !state.is_authenticated);
      localStorage.setItem(
        'is_authenticated',
        JSON.stringify(!state.is_authenticated)
      );
      return { is_authenticated: !state.is_authenticated };
    }),
}));

export default useAuth;
