import { Image, Heading, VStack, Text } from '@chakra-ui/react';
import logo from '../assets/elevate-icons/png/logo-no-background.png';

export const Home = () => {
  return (
    <>
      <VStack spacing={4}>
        <Image src={logo} boxSize="300px" objectFit="contain" />
        <Heading>Apartment Purchasing Management System</Heading>
        <Heading size={'md'}>Course Number: 27530301</Heading>
        <Heading size={'md'}>Team: W80</Heading>
        <Heading size={'md'}>Built by:</Heading>
        <Text fontSize={'xl'}>Mikael Hachaturian</Text>
        <Text fontSize={'xl'}>Alon Caspi</Text>
        <Text fontSize={'xl'}>Ofek Lahiani</Text>
      </VStack>
    </>
  );
};
