import dorianKitchens from '../assets/providers/dorian-kitchens-high-resolution-logo.png';
import electricy from '../assets/providers/electricy-high-resolution-logo.png';
import idanFlooring from '../assets/providers/idan-flooring-high-resolution-logo.png';
import realDoors from '../assets/providers/real-doors-high-resolution-logo.png';
import tomerAir from '../assets/providers/tomer-air-high-resolution-logo.png';

interface Logos {
  [key: string]: string;
}

const logos: Logos = {
  'Idan Flooring': idanFlooring,
  'Dorian Kitchens': dorianKitchens,
  'Tomer Air': tomerAir,
  Electricy: electricy,
  'Real Doors': realDoors,
};

export default logos;
