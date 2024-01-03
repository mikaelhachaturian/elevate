import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Props {
  onChangeFn: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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

const BasicForm = ({ onChangeFn }: Props) => {
  return (
    <>
      <FormControl isRequired>
        <FormLabel htmlFor="firstName">First Name:</FormLabel>
        <Input id="firstName" placeholder="First Name" onChange={onChangeFn} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="lastName">Last Name:</FormLabel>
        <Input id="lastName" placeholder="Last Name" onChange={onChangeFn} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="idNumber">ID Number:</FormLabel>
        <Input id="idNumber" placeholder="ID Number" onChange={onChangeFn} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="phoneNumber">Phone Number:</FormLabel>
        <Input
          id="phoneNumber"
          placeholder="Phone Number"
          onChange={onChangeFn}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input
          id="email"
          placeholder="example@hotmail.com"
          type="email"
          onChange={onChangeFn}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="familyStatus">Family Status:</FormLabel>
        <Select id="familyStatus" variant="filled" onChange={onChangeFn}>
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
          onChange={onChangeFn}
          required
        />
      </FormControl>
    </>
  );
};

export default BasicForm;
