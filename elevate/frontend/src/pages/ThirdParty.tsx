import { Heading, VStack } from '@chakra-ui/react';
import ThirdPartyForm from '../components/ThirdParty/ThirdPartyForm';

export const ThirdParty = () => {
  return (
    <>
      <VStack p={4}>
        <Heading>Third Party Providers</Heading>
        <ThirdPartyForm />
      </VStack>
    </>
  );
};
