import { Heading } from '@chakra-ui/react';
import useAuth from '../stores/auth';

export const Home = () => {
  const role = useAuth((state) => state.session?.data.role);
  console.log(role);
  return (
    <>
      <Heading>Main</Heading>
    </>
  );
};
