import { Box, Image, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/elevate-icons/png/logo-no-background.png';
import UserPopUp from './UserPopUp/UserPopUp';

const Header = () => {
  return (
    <VStack padding="4" justify={'space-between'} h="100vh">
      <Box>
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
      </Box>
      <Box>
        <UserPopUp />
      </Box>
    </VStack>
  );
};

export default Header;
