import {
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { FaShekelSign } from 'react-icons/fa6';
import { IoIosSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import BackendAPIClient from '../../../services/api-client';
import useAuth from '../../../stores/auth';
import {
  Spec,
  doorColors,
  doorHandles,
  doorLights,
} from '../../../stores/doorSpecs';

const apiClient = new BackendAPIClient('/api/changes/doors');

interface FormData {
  userEmail: string;
  color: string;
  handle: string;
  light: string;
  cost: number;
}

interface typeDetails {
  [key: string]: Spec;
}

const specs: typeDetails = {
  color: doorColors,
  handle: doorHandles,
  light: doorLights,
};

const ChangesForm = () => {
  const userEmail = useAuth((state) => state.session?.data.email);
  const [isAllStandard, setIsAllStandard] = useState(false);

  const defaultFormData: FormData = {
    userEmail: userEmail!,
    color: 'standard',
    handle: 'standard',
    light: 'standard',
    cost: 0,
  };

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    const arrayHelper = ['color', 'handle', 'light'];
    const filterdArray = arrayHelper.filter((a) => a != id);
    setFormData((prevState) => ({
      ...prevState,
      cost:
        // @ts-ignore
        specs[filterdArray[0]][formData[filterdArray[0]]].cost +
        // @ts-ignore
        specs[filterdArray[1]][formData[filterdArray[1]]].cost +
        specs[id][value].cost,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (
      formData.color === 'standard' &&
      formData.handle === 'standard' &&
      formData.light === 'standard'
    ) {
      setIsAllStandard(true);
    } else {
      setIsAllStandard(false);
      await apiClient.post(formData);
      navigate('/changes');
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4}>
      <FormLabel as="legend">Choose your specifications:</FormLabel>
      <Divider />

      <VStack spacing={4} padding={10}>
        <HStack w={'40vh'}>
          <FormControl>
            <FormLabel htmlFor="color">Colors:</FormLabel>
            <Select
              w="15vh"
              id="color"
              value={formData.color}
              onChange={handleChange}
            >
              <option value={'standard'}>Standard</option>
              <option value={'white'}>White</option>
              <option value={'beige'}>Beige</option>
              <option value={'nut'}>Nut</option>
            </Select>
          </FormControl>
          <Image
            src={doorColors[formData.color].type}
            boxSize="300px"
            objectFit="contain"
          />
        </HStack>
        <Divider />

        <HStack w={'40vh'}>
          <FormControl>
            <FormLabel htmlFor="handle">Handles:</FormLabel>
            <Select
              w="20vh"
              id="handle"
              value={formData.handle}
              onChange={handleChange}
            >
              <option value={'standard'}>Standard</option>
              <option value={'magnum_handle'}>Magnum</option>
              <option value={'circular_handle'}>Circular</option>
              <option value={'premium_handle'}>Premium</option>
            </Select>
          </FormControl>
          <Image
            src={doorHandles[formData.handle].type}
            boxSize="200px"
            objectFit="contain"
          />
        </HStack>
        <Divider />
        <HStack w={'40vh'}>
          <FormControl>
            <FormLabel htmlFor="light">Light:</FormLabel>
            <Select
              w="20vh"
              id="light"
              value={formData.light}
              onChange={handleChange}
            >
              <option value={'standard'}>Standard</option>
              <option value={'light_rec'}>Rectangle</option>
              <option value={'tafus_circ'}>Tafus Circular</option>
              <option value={'tafus_rec'}>Tafus Rectangle</option>
            </Select>
          </FormControl>
          <Image
            src={doorLights[formData.light].type}
            boxSize="200px"
            objectFit="contain"
          />
        </HStack>
        <HStack>
          <Text fontSize={'xl'}>Cost: {formData.cost}</Text>
          <FaShekelSign />
        </HStack>
      </VStack>

      <Center>
        <Button
          size="sm"
          bg={'#DDD8C3'}
          color={'#3E373D'}
          rightIcon={<IoIosSend />}
          type="submit"
        >
          Submit Request
        </Button>
      </Center>
      {isAllStandard && (
        <Text fontSize={'xl'} color={'red'}>
          You must change at least 1 part!
        </Text>
      )}
    </VStack>
  );
};

export default ChangesForm;
