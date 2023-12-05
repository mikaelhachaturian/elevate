import { HStack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../assets/elevate.png';
import ColorModeSwitch from './ColorModeSwitch';

const NavBar = () => {
  return (
    <HStack padding="10px" justify={'space-between'}>
      <Link to="/">
        <Image
          src={logo}
          boxSize="60px"
          objectFit="cover"
          _hover={{
            transform: 'scale(1.06)',
            transition: 'transform .15s ease-in',
          }}
        />
      </Link>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
