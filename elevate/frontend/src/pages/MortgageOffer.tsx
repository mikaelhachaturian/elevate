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
  bank: string;
  monthly_payment: number;
  fixed: OfferDetails;
  changes_every_5_years_offer: OfferDetails;
  prime: OfferDetails;
}

export interface Offers {
  offers: Offer[];
}

const defaultOfferr: Offer = {
  bank: '',
  monthly_payment: 0,
  fixed: {
    id: 0,
    interest: 0,
    monthlyFee: 0,
    sum: 0,
    years: 0,
  },
  changes_every_5_years_offer: {
    id: 0,
    interest: 0,
    monthlyFee: 0,
    sum: 0,
    years: 0,
  },
  prime: {
    id: 0,
    interest: 0,
    monthlyFee: 0,
    sum: 0,
    years: 0,
  },
};

export const MortgageOffer = () => {
  const [offers, setOffers] = useState<Offers>({ offers: [defaultOfferr] });
  const setOfferFn = (offers: Offers) => setOffers(offers);
  return (
    <>
      <VStack p={10} spacing={10} m={4}>
        <Heading>Mortgage Offers</Heading>
        {offers.offers[0].bank ? (
          offers.offers.map((offer) => (
            <OfferInfo key={offer.bank} offer={offer} />
          ))
        ) : (
          <MortgageForm offers={offers} setOffers={setOfferFn} />
        )}
      </VStack>
    </>
  );
};
