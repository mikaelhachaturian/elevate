import { Box, Button, Center, Image, Text, VStack } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/elevate-icons/png/logo-color.png';
import BackendAPIClient from '../services/api-client';
import useAuth from '../stores/auth';

interface LoginCreds {
  id_token: string;
  expiry_date: number;
  email: string;
}

const apiClient = new BackendAPIClient<LoginCreds>('/auth/google');

export const Login = () => {
  const signIn = useAuth((state) => state.signIn);
  const isAuthenticated = useAuth((state) => state.session?.isAuthenticated);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      const { id_token, expiry_date, email } = await apiClient.post({
        code: codeResponse.code,
      });

      navigate('/');
      signIn({ id_token, expiry_date, email });
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <>
      <Center bg={'#DDD8D7'} height="100vh">
        <Box
          p={6}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          bg={'#3E373D'}
          h="400px"
          w="600px"
          maxH={'90%'}
          maxW={'90%'}
        >
          <VStack spacing={1}>
            <Image src={logo} boxSize="270px" objectFit="contain" />
            {isAuthenticated ? (
              <>
                <Text color={'#DDD8C3'} fontSize="xl">
                  You are signed in already..
                </Text>
                <Button
                  bg={'#DDD8C3'}
                  color={'#3E373D'}
                  onClick={() => navigate('/')}
                >
                  Home
                </Button>
              </>
            ) : (
              <Button
                bg={'#DDD8C3'}
                color={'#3E373D'}
                onClick={() => googleLogin()}
                leftIcon={<FaGoogle />}
              >
                Sign In With Google
              </Button>
            )}
          </VStack>
        </Box>
      </Center>
    </>
  );
};
