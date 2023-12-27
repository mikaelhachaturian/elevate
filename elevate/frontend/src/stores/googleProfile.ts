import { create } from 'zustand';

interface Profile {
  name: string;
  email: string;
  picture: string;
}

interface ProfileState {
  profile?: Profile;
  setProfile: (profile: Profile) => void;
}

const useGoogleProfile = create<ProfileState>((set) => ({
  profile: undefined,
  setProfile: (profile: Profile) =>
    set(() => {
      return { profile: profile };
    }),
}));

export default useGoogleProfile;
