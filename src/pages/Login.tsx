import { Button, Heading, Text } from '@chakra-ui/react';
import useAuth from '../stores/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const signIn = useAuth((state) => state.signIn);
  const is_authenticated = useAuth((state) => state.is_authenticated);
  const navigate = useNavigate();

  return (
    <>
      <Heading>Login</Heading>
      <Text>
        {is_authenticated ? 'You are logged in' : 'You are logged out'}
      </Text>
      <Button
        onClick={() => {
          signIn();
          navigate('/');
        }}
      >
        {is_authenticated ? 'Logout' : 'Login'}
      </Button>
    </>
  );
};
