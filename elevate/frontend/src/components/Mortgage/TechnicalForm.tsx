import {
  Checkbox,
  CheckboxGroup,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Props {
  onChangeFn: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onChangeCheckBoxFn: (e: (string | number)[]) => void;
  values: TechnicalInfo;
}

export interface TechnicalInfo {
  mortgageSum: string;
  estateCity: string;
  estateValue: string;
  dateOfMortgage: string;
  employmentSatus: string;
  monthlySalary: string;
  equity: string;
  bankChoices: (string | number)[];
}

const TechnicalForm = ({ onChangeFn, onChangeCheckBoxFn, values }: Props) => {
  return (
    <VStack w={'100%'}>
      <FormControl isRequired>
        <FormLabel htmlFor="mortgageSum">Requested Mortgage Sum:</FormLabel>
        <Input
          id="mortgageSum"
          onChange={onChangeFn}
          value={values.mortgageSum ?? ''}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="estateValue">Estate Value:</FormLabel>
        <Input
          id="estateValue"
          onChange={onChangeFn}
          value={values.estateValue ?? ''}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="estateCity">Estate City:</FormLabel>
        <Input
          id="estateCity"
          onChange={onChangeFn}
          value={values.estateCity ?? ''}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="monthlySalary">Monthly Salary:</FormLabel>
        <Input
          id="monthlySalary"
          onChange={onChangeFn}
          value={values.monthlySalary ?? ''}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="equity">Equity:</FormLabel>
        <Input id="equity" onChange={onChangeFn} value={values.equity ?? ''} />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="employmentSatus">Employment Status:</FormLabel>
        <Select
          id="employmentSatus"
          variant="filled"
          onChange={onChangeFn}
          value={values.employmentSatus ?? 'Employed'}
        >
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
          value={values.dateOfMortgage ?? ''}
          onChange={onChangeFn}
          required
        />
      </FormControl>

      <Divider />

      <FormControl>
        <FormLabel htmlFor="bankChoices">
          Select Banks to get Offers from:
        </FormLabel>
        <CheckboxGroup onChange={onChangeCheckBoxFn}>
          <Stack
            id="bankChoices"
            spacing={[1, 5]}
            direction={['column', 'column']}
          >
            <Checkbox value="Poalim">Poalim</Checkbox>
            <Checkbox value="Leumi">Leumi</Checkbox>
            <Checkbox value="Mizrahi">Mizrahi</Checkbox>
            <Checkbox value="Discount">Discount</Checkbox>
          </Stack>
        </CheckboxGroup>
      </FormControl>
    </VStack>
  );
};

export default TechnicalForm;
