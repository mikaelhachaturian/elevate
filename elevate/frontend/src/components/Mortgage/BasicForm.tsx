import {
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Props {
  onChangeFn: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  values: BasicInfo;
}

export interface BasicInfo {
  firstName: string;
  lastName: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  familyStatus: string;
}

export const defaultBasicInfo = {
  firstName: '',
  lastName: '',
  idNumber: '',
  phoneNumber: '',
  email: '',
  dateOfBirth: '',
  familyStatus: 'Single',
};

const BasicForm = ({ onChangeFn, values }: Props) => {
  return (
    <VStack w={'100%'}>
      <FormControl isRequired>
        <FormLabel htmlFor="firstName">First Name:</FormLabel>
        <Input
          id="firstName"
          placeholder="First Name"
          onChange={onChangeFn}
          value={values.firstName ?? ''}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="lastName">Last Name:</FormLabel>
        <Input
          id="lastName"
          placeholder="Last Name"
          onChange={onChangeFn}
          value={values.lastName ?? ''}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="idNumber">ID Number:</FormLabel>
        <Input
          id="idNumber"
          placeholder="ID Number"
          onChange={onChangeFn}
          value={values.idNumber ?? ''}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="phoneNumber">Phone Number:</FormLabel>
        <Input
          id="phoneNumber"
          placeholder="Phone Number"
          value={values.phoneNumber ?? ''}
          onChange={onChangeFn}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input
          id="email"
          placeholder="example@mail.com"
          value={values.email ?? ''}
          type="email"
          onChange={onChangeFn}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="familyStatus">Family Status:</FormLabel>
        <Select
          id="familyStatus"
          variant="filled"
          onChange={onChangeFn}
          value={values.familyStatus ?? 'Single'}
        >
          <option key={'single'}>Single</option>
          <option key={'married'}>Married</option>
          <option key={'Widowed'}>Widowed</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="dateOfBirth">Date of Birth:</FormLabel>
        <Input
          id="dateOfBirth"
          size="md"
          type="date"
          value={values.dateOfBirth ?? ''}
          onChange={onChangeFn}
          required
        />
      </FormControl>
    </VStack>
  );
};

export default BasicForm;
