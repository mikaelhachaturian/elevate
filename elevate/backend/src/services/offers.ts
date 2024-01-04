import { Offer } from '../models/offer';

export const createOffer = async (o: Offer) => {
  o.changes_every_5_years_offer = JSON.stringify(o.changes_every_5_years_offer);
  o.prime = JSON.stringify(o.prime);
  o.fixed = JSON.stringify(o.fixed);
  const offer = await Offer.create({ ...o });
  return offer;
};

export const getOffers = async (email: string) => {
  const offer = await Offer.findOne({
    where: {
      email: email,
    },
  });

  return offer;
};
