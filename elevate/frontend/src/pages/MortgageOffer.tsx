import { Heading, VStack } from '@chakra-ui/react';
import MortgageForm from '../components/Mortgage/MortgageForm';

export const MortgageOffer = () => {
  return (
    <>
      <VStack p={4}>
        <Heading>Mortgage Offers</Heading>
        <MortgageForm />
      </VStack>
    </>
  );
};
