import { Divider, Image, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/elevate-icons/png/logo-no-background.png';
import Menu from './Menu';
import Notifications from './Notifications';
import UserPopUp from './UserPopUp/UserPopUp';

const NavBar = () => {
  return (
    <VStack padding="4" justify={'space-between'} h="100vh">
      <VStack padding="3" justify={'space-between'}>
        <Link to="/">
          <Image
            src={logo}
            boxSize="120px"
            objectFit="contain"
            _hover={{
              transform: 'scale(1.06)',
              transition: 'transform .15s ease-in',
            }}
          />
        </Link>
        <Divider />
        <Menu />
      </VStack>
      <VStack padding="6" justify={'space-between'}>
        <Divider />
        <Notifications />
        <UserPopUp />
      </VStack>
    </VStack>
  );
};

export default NavBar;
