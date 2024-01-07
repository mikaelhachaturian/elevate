import { Credentials } from 'google-auth-library';
import { getGoogleProfile } from './google';
import { User } from '../models/user';

const createUser = async (user: User) => {
  const u = await User.create({ ...user });
  return u;
};

const contractors = ['mikael.hach@gmail.com'];

export const saveUser = async (tokens: Credentials) => {
  const { name, email, given_name, picture } = await getGoogleProfile(tokens);
  const { id_token, refresh_token, access_token } = tokens;

  const role = contractors.indexOf(email) > -1 ? 'contractor' : 'user';

  const user = await createUser({
    name,
    email,
    given_name,
    picture,
    id_token,
    refresh_token,
    access_token,
    role,
  } as User);
  return user;
};

export const getUser = async (email: string) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  return user;
};
