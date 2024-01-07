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

interface Spec {
  [key: string]: string;
}

export const doorColors: Spec = {
  standard: standard_door,
  beige: beige,
  nut: nut,
  white: white,
};

export const doorHandles: Spec = {
  standard: standard_handle,
  circular_handle: circular_handle,
  magnum_handle: magnum_handle,
  premium_handle: premium_handle,
};

export const doorLights: Spec = {
  standard: standard_light,
  tafus_rec: tafus_rec,
  tafus_circ: tafus_circ,
  light_rec: light_rec,
};
