import {
  Button,
  Center,
  HStack,
  Image,
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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { doorColors, doorHandles, doorLights } from '../../../stores/doorSpecs';

interface Props {
  setIsChangeSpecs: () => void;
}

const StandardDoor = ({ setIsChangeSpecs }: Props) => {
  const navigate = useNavigate();
  return (
    <VStack spacing={4}>
      <Text fontSize={'xl'}>Standard Specifications for the Doors:</Text>
      <TableContainer>
        <Table
          variant="simple"
          size={'lg'}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <TableCaption>Standard Specifications</TableCaption>
          <Thead>
            <Tr>
              <Th px={100}>Part</Th>
              <Th px={100}>Picture</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Center>
                  <Text fontSize={'xl'}>Door</Text>
                </Center>
              </Td>
              <Td>
                <Image
                  src={doorColors['standard']}
                  boxSize="300px"
                  objectFit="contain"
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Center>
                  <Text fontSize={'xl'}>Light</Text>
                </Center>
              </Td>
              <Td>
                <Image
                  src={doorLights['standard']}
                  boxSize="200px"
                  objectFit="contain"
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Center>
                  <Text fontSize={'xl'}>Handle</Text>
                </Center>
              </Td>
              <Td>
                <Image
                  src={doorHandles['standard']}
                  boxSize="200px"
                  objectFit="contain"
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Text fontSize={'xl'}>Would You Like to change it?</Text>
      <HStack>
        <Button
          size="sm"
          bg={'#DDD8C3'}
          color={'#3E373D'}
          onClick={() => {
            navigate('/');
          }}
        >
          No
        </Button>
        <Button
          size="sm"
          bg={'#DDD8C3'}
          color={'#3E373D'}
          onClick={setIsChangeSpecs}
        >
          Change
        </Button>
      </HStack>
    </VStack>
  );
};

export default StandardDoor;
