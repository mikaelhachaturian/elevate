import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Props {
  onChangeFn: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    borrowerKey: 'borrower' | 'borrower2'
  ) => void;
  borrowerKey: 'borrower' | 'borrower2';
  isOpen: boolean;
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

const BasicForm = ({ onChangeFn, borrowerKey, isOpen }: Props) => {
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // Call onChangeFn with both arguments
    onChangeFn(e, borrowerKey);
  };
  return (
    <>
      <FormControl isRequired={isOpen}>
        <FormLabel htmlFor="firstName">First Name:</FormLabel>
        <Input
          id="firstName"
          placeholder="First Name"
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl isRequired={isOpen}>
        <FormLabel htmlFor="lastName">Last Name:</FormLabel>
        <Input
          id="lastName"
          placeholder="Last Name"
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl isRequired={isOpen}>
        <FormLabel htmlFor="idNumber">ID Number:</FormLabel>
        <Input
          id="idNumber"
          placeholder="ID Number"
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl isRequired={isOpen}>
        <FormLabel htmlFor="phoneNumber">Phone Number:</FormLabel>
        <Input
          id="phoneNumber"
          placeholder="Phone Number"
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl isRequired={isOpen}>
        <FormLabel htmlFor="email">Email:</FormLabel>
        <Input
          id="email"
          placeholder="example@hotmail.com"
          type="email"
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="familyStatus">Family Status:</FormLabel>
        <Select id="familyStatus" variant="filled" onChange={handleInputChange}>
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
          onChange={handleInputChange}
          required={isOpen}
        />
      </FormControl>
    </>
  );
};

export default BasicForm;
