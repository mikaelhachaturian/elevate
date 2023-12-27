import { Button, Heading, Text } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import useAuth from '../stores/auth';
import axios from 'axios';

export const Login = () => {
  const signIn = useAuth((state) => state.signIn);
  const isAuthenticated = useAuth((state) => state.session?.isAuthenticated);
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const tokens = await axios.post(`${backendURL}/auth/google`, {
        code: codeResponse.code,
      });

      navigate('/');
      signIn(tokens.data);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <>
      <Heading>Login</Heading>
      <Text>
        {isAuthenticated ? 'You are logged in' : 'You are logged out'}
      </Text>
      <Button onClick={() => googleLogin()}>Sign In With Google</Button>
    </>
  );
};
