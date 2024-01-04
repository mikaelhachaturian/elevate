import { Button, FormLabel, HStack, VStack } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosSend } from 'react-icons/io';

import { hasField } from '../../utils';
import BasicForm, { BasicInfo, defaultBasicInfo } from './BasicForm';
import TechnicalForm, {
  TechnicalInfo,
  defaultTechnicalInfo,
} from './TechnicalForm';

interface FormData {
  borrowerBasicInfo: BasicInfo;
  technicalInfo: TechnicalInfo;
}

// const apiClient = new APIClient('/api/appointments');

const MortgageForm = () => {
  // const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  const totalSteps = 2;

  const [formData, setFormData] = useState<FormData>({
    borrowerBasicInfo: defaultBasicInfo,
    technicalInfo: defaultTechnicalInfo,
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
    }
    if (hasField(formData.technicalInfo, id)) {
      // Check if the borrower info exists, if not, provide a default value
      const currentTechnicalInfo =
        formData.technicalInfo ?? defaultTechnicalInfo;

      const updatedTechnical: TechnicalInfo = {
        ...currentTechnicalInfo,
        [id]: type === 'select-one' ? e.target.value : value,
      };

      setFormData((prevState) => ({
        ...prevState,
        technicalInfo: updatedTechnical,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    console.log(formData);

    // await apiClient.post(formData);
    // navigate('/');
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicForm
            onChangeFn={handleChange}
            values={formData.borrowerBasicInfo}
          />
        );
      case 2:
        return (
          <TechnicalForm
            onChangeFn={handleChange}
            values={formData.technicalInfo}
          />
        );
    }
  };

  return (
    <>
      <VStack id="form" as="form" onSubmit={handleSubmit}>
        <FormLabel as="legend">
          Please fill the following info to get an offer for mortgage from the
          banks:
        </FormLabel>

        {renderFormStep()}
        <HStack>
          {currentStep > 1 && (
            <Button
              size="sm"
              bg={'#DDD8C3'}
              color={'#3E373D'}
              rightIcon={<IoIosArrowBack />}
              onClick={prevStep}
            >
              Previous
            </Button>
          )}
          {currentStep < totalSteps && (
            <Button
              size="sm"
              bg={'#DDD8C3'}
              color={'#3E373D'}
              rightIcon={<IoIosArrowForward />}
              onClick={nextStep}
              type="submit"
            >
              Next
            </Button>
          )}
          {currentStep === totalSteps && (
            <Button
              size="sm"
              bg={'#DDD8C3'}
              color={'#3E373D'}
              rightIcon={<IoIosSend />}
              type="submit"
            >
              Submit
            </Button>
          )}
        </HStack>
      </VStack>
    </>
  );
};

export default MortgageForm;
