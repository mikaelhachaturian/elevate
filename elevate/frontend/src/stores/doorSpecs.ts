import standard_door from '../assets/doors/standard/standard_color.jpeg';
import standard_light from '../assets/doors/standard/light_standard.jpeg';
import standard_handle from '../assets/doors/standard/standard_handle.jpeg';

import beige from '../assets/doors/colors/beige.png';
import nut from '../assets/doors/colors/egoz.png';
import white from '../assets/doors/colors/white.png';

import circular_handle from '../assets/doors/handles/circular_handle.jpeg';
import magnum_handle from '../assets/doors/handles/magnum.jpeg';
import premium_handle from '../assets/doors/handles/premuim_infi.jpeg';

import light_rec from '../assets/doors/light/light_rec.jpeg';
import tafus_circ from '../assets/doors/light/tafus_circ.jpeg';
import tafus_rec from '../assets/doors/light/tafus_rec.jpeg';

interface SpecDetails {
  type: string;
  cost: number;
}

export interface Spec {
  [key: string]: SpecDetails;
}

export const doorColors: Spec = {
  standard: { type: standard_door, cost: 0 },
  beige: { type: beige, cost: 600 },
  nut: { type: nut, cost: 550 },
  white: { type: white, cost: 500 },
};

export const doorHandles: Spec = {
  standard: { type: standard_handle, cost: 0 },
  circular_handle: { type: circular_handle, cost: 200 },
  magnum_handle: { type: magnum_handle, cost: 250 },
  premium_handle: { type: premium_handle, cost: 300 },
};

export const doorLights: Spec = {
  standard: { type: standard_light, cost: 0 },
  tafus_rec: { type: tafus_rec, cost: 100 },
  tafus_circ: { type: tafus_circ, cost: 150 },
  light_rec: { type: light_rec, cost: 150 },
};
