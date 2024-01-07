import { Button, VStack } from '@chakra-ui/react';
import { RiContactsBookFill } from 'react-icons/ri';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { RiBankFill } from 'react-icons/ri';

const Menu = () => {
  return (
    <>
      <VStack>
        <Link to="/thirdparty">
          <Button
            size="sm"
            color={'#DDD8C3'}
            _hover={{ bg: '#836862' }}
            leftIcon={<RiContactsBookFill />}
            variant="ghost"
          >
            Third Party Providers
          </Button>
        </Link>
        <Link to="/appointments">
          <Button
            size="sm"
            color={'#DDD8C3'}
            leftIcon={<FaRegCalendarCheck />}
            _hover={{ bg: '#836862' }}
            variant="ghost"
          >
            My Appointments
          </Button>
        </Link>
        <Link to="/mortgages">
          <Button
            size="sm"
            color={'#DDD8C3'}
            leftIcon={<RiBankFill />}
            _hover={{ bg: '#836862' }}
            variant="ghost"
          >
            Mortgage Offer
          </Button>
        </Link>
      </VStack>
    </>
  );
};

export default Menu;
