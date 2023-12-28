import { create } from 'zustand';

interface Profile {
  name: string;
  given_name: string;
  email: string;
  picture: string;
}

interface ProfileState {
  profile?: Profile;
  setProfile: (profile: Profile | undefined) => void;
}

const useGoogleProfile = create<ProfileState>((set) => ({
  profile: undefined,
  setProfile: (profile: Profile | undefined) =>
    set(() => {
      return { profile: profile };
    }),
}));

export default useGoogleProfile;
