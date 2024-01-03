import {
  Box,
  Button,
  Collapse,
  FormLabel,
  HStack,
  Heading,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

import BasicForm, { defaultBasicInfo } from './BasicForm';

interface BasicInfo {
  firstName: string;
  lastName: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  familyStatus: string;
}

interface FormData {
  borrower: BasicInfo;
  borrower2: BasicInfo;
}

// const apiClient = new APIClient('/api/appointments');

const MortgageForm = () => {
  const { isOpen, onToggle } = useDisclosure();
  // const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    borrower: defaultBasicInfo,
    borrower2: defaultBasicInfo,
  });

  const updateBorrowerInfo = (
    borrowerKey: 'borrower' | 'borrower2',
    newInfo: BasicInfo
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [borrowerKey]: newInfo,
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    borrowerKey: 'borrower' | 'borrower2'
  ) => {
    const { id, type, value } = e.target;
    // Check if the borrower info exists, if not, provide a default value
    const currentBorrowerInfo = formData[borrowerKey] ?? {
      firstName: '',
      lastName: '',
      idNumber: '',
      phoneNumber: '',
      email: '',
      dateOfBirth: '',
      familyStatus: '',
    };

    const updatedBorrowerInfo: BasicInfo = {
      ...currentBorrowerInfo,
      [id]: type === 'select-one' ? e.target.value : value,
    };

    updateBorrowerInfo(borrowerKey, updatedBorrowerInfo);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    console.log(formData);

    // await apiClient.post(formData);
    // navigate('/');
  };

  return (
    <>
      <VStack id="form">
        <Box p={4}>
          <VStack as="form" onSubmit={handleSubmit} spacing={4}>
            <FormLabel as="legend">
              Please fill the following info to get an offer for mortgage from
              the banks:
            </FormLabel>
            <BasicForm
              onChangeFn={handleChange}
              borrowerKey="borrower"
              isOpen={true}
            />

            <Button onClick={onToggle}>Add Another Borrower</Button>
            <Collapse in={isOpen}>
              <Box w={'100%'}>
                <BasicForm
                  onChangeFn={handleChange}
                  borrowerKey="borrower2"
                  isOpen={isOpen}
                />
              </Box>
            </Collapse>

            <Button
              size="sm"
              bg={'#DDD8C3'}
              color={'#3E373D'}
              rightIcon={<IoIosSend />}
              type="submit"
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

export default MortgageForm;
