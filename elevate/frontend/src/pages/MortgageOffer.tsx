import { Heading, VStack } from '@chakra-ui/react';
import MortgageForm from '../components/Mortgage/MortgageForm';
import { useState } from 'react';

interface OfferDetails {
  id: number;
  interest: number;
  monthlyFee: number;
  sum: number;
  years: number;
}

export interface Offer {
  bank_name: string;
  total_years: number;
  monthly_payment: number;
  fixed: OfferDetails | undefined;
  changes_every_5_years_offer: OfferDetails | undefined;
  prime: OfferDetails | undefined;
}

export const MortgageOffer = () => {
  const [offer, setOffer] = useState<Offer>({
    bank_name: '',
    total_years: 0,
    monthly_payment: 0,
    fixed: undefined,
    changes_every_5_years_offer: undefined,
    prime: undefined,
  });
  const setOfferFn = (offer: Offer) => setOffer(offer);
  return (
    <>
      <VStack p={10} spacing={10} m={4}>
        <Heading>Mortgage Offers</Heading>
        <MortgageForm offer={offer} setOffer={setOfferFn} />
      </VStack>
    </>
  );
};
