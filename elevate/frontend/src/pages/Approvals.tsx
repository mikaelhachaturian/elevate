import {
  Button,
  Center,
  Divider,
  HStack,
  Heading,
  Image,
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
  useToast,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import useAllChanges from '../hooks/useAllChanges';
import useAuth from '../stores/auth';
import { doorColors, doorHandles, doorLights } from '../stores/doorSpecs';
import BackendAPIClient from '../services/api-client';
import DeclinePopUp from '../components/Approvals/DeclinePopUp';

const apiClient = new BackendAPIClient('/api/changes');

export const Approvals = () => {
  const { data, error, isLoading } = useAllChanges();
  const toast = useToast();
  const role = useAuth((state) => state.session?.data.role);
  if (role === 'user') return <Navigate to="/" replace />;

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
        <Heading>Approvals</Heading>
        <Divider />
        <Text>No change requests made..</Text>
      </VStack>
    );
  }

  const approveRequest = async (e: React.MouseEvent<HTMLElement>) => {
    const payload = {
      approval: true,
      changedStatus: true,
      changeRequestId: (e.target as any).value,
    };
    const post = apiClient.post(payload);
    toast.promise(post, {
      success: {
        title: 'Request Approved.',
        description: 'Notification sent to user.',
      },
      error: {
        title: 'Request was not approved..',
        description: 'Something went wrong..',
      },
      loading: { title: 'Approving Request', description: 'Please wait..' },
    });
  };

  return (
    <>
      <VStack p={10} spacing={10} m={4}>
        <Heading>Approvals</Heading>
        <Divider />
        <TableContainer>
          <Table
            variant="simple"
            size={'lg'}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <TableCaption>Approvals</TableCaption>
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Type</Th>
                <Th>Request ID</Th>
                <Th>Specifications</Th>
                <Th>Cost</Th>
                <Th>Approved</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.changes?.map((change, index) => (
                <Tr key={index}>
                  <Td>{change.email}</Td>
                  <Td>{change.type}</Td>
                  <Td>{change.changeRequestId}</Td>
                  <Td>
                    <HStack>
                      <VStack>
                        <Image
                          src={doorColors[change.description.color].type}
                          boxSize="200px"
                          objectFit="contain"
                          alt={change.description.color}
                        />
                        <Text>{change.description.color}</Text>
                      </VStack>
                      <VStack>
                        <Image
                          src={doorHandles[change.description.handle].type}
                          boxSize="200px"
                          objectFit="contain"
                          alt={change.description.handle}
                        />
                        <Text>{change.description.handle}</Text>
                      </VStack>
                      <VStack>
                        <Image
                          src={doorLights[change.description.light].type}
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
                    <VStack spacing={4}>
                      {change.changedStatus ? (
                        <Text as={'b'}>
                          Request{' '}
                          {change.approved ? (
                            <Text color={'green'}>Approved</Text>
                          ) : (
                            <Text color={'red'}>Denied</Text>
                          )}
                        </Text>
                      ) : (
                        <>
                          <Button
                            bg={'#DDD8C3'}
                            color={'#3E373D'}
                            onClick={approveRequest}
                            value={change.changeRequestId}
                          >
                            Approve
                          </Button>
                          <DeclinePopUp
                            changeRequestId={change.changeRequestId}
                          />
                        </>
                      )}
                    </VStack>
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
