import {
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
} from '@chakra-ui/react';
import useAppointments from '../hooks/useAppointments';
import logos from '../stores/providerLogos';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}/${month}/${year} ${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
};

const Appointments = () => {
  const { data, error, isLoading } = useAppointments();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  if (error || !data) throw error;

  if (data?.appointments.length === 0) {
    return (
      <VStack p={10} spacing={10} m={4}>
        <Heading>My Appointments</Heading>
        <Divider />
        <Text>No appointments made..</Text>
      </VStack>
    );
  }

  return (
    <>
      <VStack p={10} spacing={10} m={4}>
        <Heading>My Appointments</Heading>
        <Divider />
        <TableContainer>
          <Table
            variant="simple"
            size={'lg'}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <TableCaption>My Appointments</TableCaption>
            <Thead>
              <Tr>
                <Th>With</Th>
                <Th>Date</Th>
                <Th>Extra Information</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.appointments.map((appointment, index) => (
                <Tr key={index}>
                  <Td>
                    <HStack>
                      <Image
                        src={logos[appointment.with]}
                        alt={appointment.with}
                        boxSize="60px"
                        objectFit="contain"
                      />
                      <Text>{appointment.with}</Text>
                    </HStack>
                  </Td>
                  <Td>{formatDate(appointment.date)}</Td>
                  <Td>{appointment.text}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </>
  );
};

export default Appointments;
