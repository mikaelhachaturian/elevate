import { Box, Button, Center, Heading, Text, VStack } from '@chakra-ui/react';
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <>
      <Center bg={'#DDD8D7'} height="100vh">
        <Box
          p={6}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          bg={'#3E373D'}
          h="200px"
          w="350px"
          maxH={'90%'}
          maxW={'90%'}
          color={'#DDD8C3'}
          fontSize="xl"
        >
          <VStack spacing={3} justify={'space-between'}>
            <Heading>Oops</Heading>
            {isRouteErrorResponse(error) ? (
              <>
                <Text>This page does not exist. (404)</Text>
                <Button
                  bg={'#DDD8C3'}
                  color={'#3E373D'}
                  onClick={() => navigate('/')}
                >
                  Take Me Home
                </Button>
              </>
            ) : (
              'An unexpected error occurred.'
            )}
          </VStack>
        </Box>
      </Center>
    </>
  );
};

export default ErrorPage;
