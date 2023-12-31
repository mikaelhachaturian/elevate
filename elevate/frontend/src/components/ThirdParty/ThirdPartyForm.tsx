import {
  HStack,
  VStack,
  FormLabel,
  FormControl,
  Select,
  Textarea,
  Center,
  Button,
  Heading,
  Box,
  Input,
} from '@chakra-ui/react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

interface Provider {
  name: string;
  cost: string;
}

interface FormData {
  provider: Provider | undefined;
  date: string;
  text: string;
}

const ThirdPartyForm = () => {
  const [providerOptions, setProviderOptions] = useState<Provider[]>([]);

  const [formData, setFormData] = useState<FormData>({
    provider: undefined,
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

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('Form data: ', formData);
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
                <FormLabel htmlFor="provider">Provider</FormLabel>
                <Select
                  id="provider"
                  value={formData['provider']?.name}
                  onChange={handleChange}
                >
                  {providerOptions.map((option) => (
                    <option>{option.name}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="date">Date of Work</FormLabel>
                <Input
                  id="date"
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="extraInfo">Extra Information</FormLabel>
                <Textarea
                  id="text"
                  placeholder="Provide some extra information about the appointment.."
                  onChange={handleChange}
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
          <Heading>Info on {formData['provider']?.name}</Heading>
          <Heading>Name</Heading>
          <Heading>Work Times</Heading>
          <Heading>Cost</Heading>
        </VStack>
      </HStack>
    </>
  );
};

export default ThirdPartyForm;