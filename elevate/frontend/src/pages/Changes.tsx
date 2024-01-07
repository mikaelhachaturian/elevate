import {
  Center,
  Divider,
  Heading,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Image,
  HStack,
} from '@chakra-ui/react';
import useChanges from '../hooks/useChanges';
import { doorColors, doorHandles, doorLights } from '../stores/doorSpecs';

const Changes = () => {
  const { data, error, isLoading } = useChanges();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  if (error || !data) throw error;

  if (data?.changes.length === 0) {
    return (
      <VStack p={10} spacing={10} m={4}>
        <Heading>My Changes</Heading>
        <Divider />
        <Text>No change requests made..</Text>
      </VStack>
    );
  }

  return (
    <>
      <VStack p={10} spacing={10} m={4}>
        <Heading>My Changes</Heading>
        <Divider />
        <TableContainer>
          <Table
            variant="simple"
            size={'lg'}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <TableCaption>My Changes</TableCaption>
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>Specifications</Th>
                <Th>Cost</Th>
                <Th>Approved</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.changes?.map((change, index) => (
                <Tr key={index}>
                  <Td>{change.type}</Td>
                  <Td>
                    <HStack>
                      <VStack>
                        <Image
                          src={doorColors[change.description.color]}
                          boxSize="200px"
                          objectFit="contain"
                          alt={change.description.color}
                        />
                        <Text>{change.description.color}</Text>
                      </VStack>
                      <VStack>
                        <Image
                          src={doorHandles[change.description.handle]}
                          boxSize="200px"
                          objectFit="contain"
                          alt={change.description.handle}
                        />
                        <Text>{change.description.handle}</Text>
                      </VStack>
                      <VStack>
                        <Image
                          src={doorLights[change.description.light]}
                          boxSize="200px"
                          objectFit="contain"
                          alt={change.description.light}
                        />
                        <Text>{change.description.light}</Text>
                      </VStack>
                    </HStack>
                  </Td>
                  <Td>{change.cost}</Td>
                  <Td>
                    {change.approved ? (
                      <Text as={'b'} color={'green'}>
                        Approved
                      </Text>
                    ) : (
                      <Text as={'b'} color={'red'}>
                        Not Approved
                      </Text>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </>
  );
};

export default Changes;
