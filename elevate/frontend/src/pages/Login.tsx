import { Box, Button, Center, Image, Text, VStack } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/elevate-icons/png/logo-color.png';
import useAuth from '../stores/auth';
import { FaGoogle } from 'react-icons/fa';

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

      const { id_token, expiry_date, email } = tokens.data;

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
