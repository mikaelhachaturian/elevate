import { HStack, Image, Text, VStack } from '@chakra-ui/react';
import { FaShekelSign } from 'react-icons/fa6';
import logos from '../../stores/providerLogos';
import { Provider } from '../../hooks/useThirdParties';

interface Props {
  provider: Provider;
}

const ProviderInfo = ({ provider }: Props) => {
  return (
    <>
      <VStack
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        spacing={3}
        w={'600px'}
        padding={6}
      >
        <Image
          src={logos[provider?.name]}
          alt={provider?.name}
          boxSize="200px"
          objectFit="contain"
        />
        <Text fontSize="lg" as="b">
          Name: {provider?.name}
        </Text>
        <Text fontSize="lg">Work Description: {provider?.description}</Text>
        <Text fontSize="md">Work Times: {provider?.work_times}</Text>
        <Text fontSize="md">Phone: {provider?.phone}</Text>
        <HStack>
          <Text fontSize="md" as="b">
            Start from: {provider?.cost}
          </Text>
          <FaShekelSign />
        </HStack>
      </VStack>
    </>
  );
};

export default ProviderInfo;
