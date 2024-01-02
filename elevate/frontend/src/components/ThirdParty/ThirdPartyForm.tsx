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
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

import { useNavigate } from 'react-router-dom';
import useAuth from '../../stores/auth';
import ProviderInfo from './ProviderInfo';

export interface Provider {
  name: string;
  cost: string;
  picture: string;
  description: string;
  work_times: string;
  phone: string;
}

interface FormData {
  provider: Provider | undefined;
  userEmail: string;
  date: string;
  text: string;
}

const ThirdPartyForm = () => {
  const [providerOptions, setProviderOptions] = useState<Provider[]>([]);
  const userEmail = useAuth((state) => state.session?.data.email);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    provider: undefined,
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
        type === 'select-one'
          ? providerOptions.find((p) => p.name === value)
          : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    await axios.post(`${backendURL}/api/appointments`, formData, {
      headers: {
        Accept: 'application/json',
      },
    });
    navigate('/appointments');
  };

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${backendURL}/api/thirdparty`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res: AxiosResponse) => {
        const { providers } = res.data;
        setProviderOptions(providers);
        setFormData((prevState) => ({
          ...prevState,
          provider: providers[0],
        }));
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

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
                  {providerOptions.map((option) => (
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
