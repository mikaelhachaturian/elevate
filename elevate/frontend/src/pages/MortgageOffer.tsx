import { Heading, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import MortgageForm from '../components/Mortgage/MortgageForm';
import OfferInfo from '../components/Mortgage/OfferInfo';

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
  fixed: OfferDetails;
  changes_every_5_years_offer: OfferDetails;
  prime: OfferDetails;
}

const defaultOfferDetails = {
  id: 0,
  interest: 0,
  monthlyFee: 0,
  sum: 0,
  years: 0,
};

export const MortgageOffer = () => {
  const [offer, setOffer] = useState<Offer>({
    bank_name: '',
    total_years: 0,
    monthly_payment: 0,
    fixed: defaultOfferDetails,
    changes_every_5_years_offer: defaultOfferDetails,
    prime: defaultOfferDetails,
  });
  const setOfferFn = (offer: Offer) => setOffer(offer);
  return (
    <>
      <VStack p={10} spacing={10} m={4}>
        <Heading>Mortgage Offers</Heading>
        {offer.bank_name ? (
          <OfferInfo offer={offer} />
        ) : (
          <MortgageForm offer={offer} setOffer={setOfferFn} />
        )}
      </VStack>
    </>
  );
};
