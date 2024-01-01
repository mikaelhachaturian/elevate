import {
  Divider,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Image,
} from '@chakra-ui/react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import useGoogleProfile from '../stores/googleProfile';
import logos from '../stores/providerLogos';

interface Appointment {
  by: string;
  with: string;
  date: string;
  text: string;
}

const Appointments = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const userEmail = useGoogleProfile((state) => state.profile?.email);

  useEffect(() => {
    if (userEmail) {
      axios
        .get(`${backendURL}/api/appointments`, {
          params: { email: userEmail },
          headers: {
            Accept: 'application/json',
          },
        })
        .then((res: AxiosResponse) => {
          const { appointments } = res.data;
          setAppointments(appointments);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    }
  }, [userEmail]);

  if (appointments.length === 0) {
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
              {appointments.map((appointment) => (
                <Tr>
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
                  <Td>{appointment.date}</Td>
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
