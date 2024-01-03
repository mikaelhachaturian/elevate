import { Box, Button, FormLabel, VStack } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

import BasicForm, { BasicInfo, defaultBasicInfo } from './BasicForm';
import { hasField } from '../../utils';

interface FormData {
  borrowerBasicInfo: BasicInfo;
}

// const apiClient = new APIClient('/api/appointments');

const MortgageForm = () => {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    borrowerBasicInfo: defaultBasicInfo,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, type, value } = e.target;
    if (hasField(formData.borrowerBasicInfo, id)) {
      // Check if the borrower info exists, if not, provide a default value
      const currentBorrowerInfo =
        formData.borrowerBasicInfo ?? defaultBasicInfo;

      const updatedBorrowerInfo: BasicInfo = {
        ...currentBorrowerInfo,
        [id]: type === 'select-one' ? e.target.value : value,
      };

      setFormData((prevState) => ({
        ...prevState,
        borrowerBasicInfo: updatedBorrowerInfo,
      }));
    } else {
      console.log('different type');
    }
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
            <BasicForm onChangeFn={handleChange} />

            <Button
              size="sm"
              bg={'#DDD8C3'}
              color={'#3E373D'}
              rightIcon={<IoIosSend />}
              type="submit"
            >
              Next
            </Button>
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

export default MortgageForm;
