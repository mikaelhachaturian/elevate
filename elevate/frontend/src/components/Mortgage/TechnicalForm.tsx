import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Props {
  onChangeFn: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export interface TechnicalInfo {
  mortgageSum: string;
  paybackYears: string;
  estateCity: string;
  estateValue: string;
  dateOfMortgage: string;
  employmentSatus: string;
  monthlySalary: string;
  equity: string;
}

export const defaultTechnicalInfo = {
  mortgageSum: '',
  paybackYears: '',
  estateCity: '',
  estateValue: '',
  dateOfMortgage: '',
  employmentSatus: 'Employed',
  monthlySalary: '',
  equity: '',
};

const TechnicalForm = ({ onChangeFn }: Props) => {
  return (
    <>
      <FormControl isRequired>
        <FormLabel htmlFor="mortgageSum">Requested Mortgage Sum:</FormLabel>
        <Input id="mortgageSum" onChange={onChangeFn} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="paybackYears">Years for Payback:</FormLabel>
        <Input id="paybackYears" onChange={onChangeFn} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="estateValue">Estate Value:</FormLabel>
        <Input id="estateValue" onChange={onChangeFn} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="estateCity">Estate City:</FormLabel>
        <Input id="estateCity" onChange={onChangeFn} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="monthlySalary">Monthly Salary:</FormLabel>
        <Input id="monthlySalary" onChange={onChangeFn} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="equity">Equity:</FormLabel>
        <Input id="equity" onChange={onChangeFn} />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="employmentSatus">Employment Status:</FormLabel>
        <Select id="employmentSatus" variant="filled" onChange={onChangeFn}>
          <option key={'employed'}>Employed</option>
          <option key={'unemployed'}>Unemployed</option>
          <option key={'selfEmployed'}>Self-Employed</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="dateOfMortgage">Mortgage Payment Date:</FormLabel>
        <Input
          id="dateOfMortgage"
          size="md"
          type="date"
          onChange={onChangeFn}
          required
        />
      </FormControl>
    </>
  );
};

export default TechnicalForm;
