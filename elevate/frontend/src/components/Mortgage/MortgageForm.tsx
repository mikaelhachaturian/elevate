import { Button, FormLabel, HStack, Text, VStack } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosSend } from 'react-icons/io';

import { Offers } from '../../pages/MortgageOffer';
import BanksAPIClient from '../../services/banks-api-client';
import { hasField } from '../../utils';
import BasicForm, { BasicInfo } from './BasicForm';
import TechnicalForm, { TechnicalInfo } from './TechnicalForm';

interface FormData {
  borrowerBasicInfo: BasicInfo;
  technicalInfo: TechnicalInfo;
}

interface Props {
  offers: Offers;
  setOffers: (offers: Offers) => void;
}

const apiClient = new BanksAPIClient<Offers>('/random_bank');

const defaultBasicInfo = {
  firstName: '',
  lastName: '',
  idNumber: '',
  phoneNumber: '',
  email: '',
  dateOfBirth: '',
  familyStatus: 'Single',
};

const defaultTechnicalInfo = {
  mortgageSum: '',
  estateCity: '',
  estateValue: '',
  dateOfMortgage: '',
  employmentSatus: 'Employed',
  monthlySalary: '',
  equity: '',
  bankChoices: [''],
};

const MortgageForm = ({ offers, setOffers }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  const totalSteps = 2;
  const [isBanksEmpty, setIsBanksEmpty] = useState(false);

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

  const handleCheckBoxChange = (e: (string | number)[]) => {
    const currentTechnicalInfo = formData.technicalInfo ?? defaultTechnicalInfo;
    const updatedTechnical: TechnicalInfo = {
      ...currentTechnicalInfo,
      bankChoices: e,
    };
    setFormData((prevState) => ({
      ...prevState,
      technicalInfo: updatedTechnical,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (formData.technicalInfo.bankChoices[0] != '') {
      offers = await apiClient.post({
        banks: formData.technicalInfo.bankChoices,
      });
      setOffers(offers);
      setIsBanksEmpty(false);
    } else {
      setIsBanksEmpty(true);
    }
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
            onChangeCheckBoxFn={handleCheckBoxChange}
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
        {isBanksEmpty && (
          <Text fontSize={'xl'} color={'red'}>
            You must select at least 1 Bank!
          </Text>
        )}
      </VStack>
    </>
  );
};

export default MortgageForm;
