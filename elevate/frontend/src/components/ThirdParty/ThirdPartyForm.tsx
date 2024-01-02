import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

import { useNavigate } from 'react-router-dom';
import { Provider } from '../../hooks/useThirdParties';
import APIClient from '../../services/api-client';
import useAuth from '../../stores/auth';
import ProviderInfo from './ProviderInfo';

interface FormData {
  provider: Provider | undefined;
  userEmail: string;
  date: string;
  text: string;
}

interface Props {
  providers: Provider[];
}

const apiClient = new APIClient('/api/appointments');

const ThirdPartyForm = ({ providers }: Props) => {
  const userEmail = useAuth((state) => state.session?.data.email);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    provider: providers[0],
    userEmail: userEmail!,
    date: '',
    text: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]:
        type === 'select-one' ? providers.find((p) => p.name === value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    await apiClient.post(formData);
    navigate('/appointments');
  };

  return (
    <>
      <HStack id="mainSection" p={4} spacing={6}>
        <VStack id="form">
          <Box p={4}>
            <VStack as="form" onSubmit={handleSubmit} spacing={4}>
              <FormLabel as="legend">
                Schedule an appointment with a third party provider:
              </FormLabel>

              <FormControl>
                <FormLabel htmlFor="provider">Provider:</FormLabel>
                <Select
                  id="provider"
                  value={formData['provider']?.name}
                  onChange={handleChange}
                >
                  {providers.map((option) => (
                    <option key={option.name}>{option.name}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="date">Date of Work:</FormLabel>
                <Input
                  id="date"
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="extraInfo">Extra Information:</FormLabel>
                <Textarea
                  id="text"
                  placeholder="Provide some extra information about the appointment.."
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <Center>
                <Button
                  size="sm"
                  bg={'#DDD8C3'}
                  color={'#3E373D'}
                  rightIcon={<IoIosSend />}
                  type="submit"
                >
                  Schedule
                </Button>
              </Center>
            </VStack>
          </Box>
        </VStack>
        <VStack id="providerInfo" p={8}>
          <ProviderInfo provider={formData.provider!} />
        </VStack>
      </HStack>
    </>
  );
};

export default ThirdPartyForm;
