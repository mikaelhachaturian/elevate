import { Heading, Spinner, VStack } from '@chakra-ui/react';
import ThirdPartyForm from '../components/ThirdParty/ThirdPartyForm';
import useThirdParties from '../hooks/useThirdParties';

export const ThirdParty = () => {
  const { data, error, isLoading } = useThirdParties();
  if (isLoading) {
    return <Spinner />;
  }

  if (error || !data) throw error;

  return (
    <>
      <VStack p={4}>
        <Heading>Third Party Providers</Heading>
        <ThirdPartyForm providers={data?.providers} />
      </VStack>
    </>
  );
};
