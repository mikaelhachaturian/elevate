import { Credentials } from 'google-auth-library';
import { getGoogleProfile } from './google';
import { User } from '../models/user';

const createUser = async (user: User) => {
  const u = await User.create({ ...user });
  return u;
};

export const saveUser = async (tokens: Credentials) => {
  const { name, email, given_name, picture } = await getGoogleProfile(tokens);
  const { id_token, refresh_token, access_token } = tokens;

  await createUser({
    name,
    email,
    given_name,
    picture,
    id_token,
    refresh_token,
    access_token,
  } as User);
};

export const getUser = async (id_token: string) => {
  const user = await User.findOne({
    where: {
      id_token: id_token,
    },
  });
  return user;
};
