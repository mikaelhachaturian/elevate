import { Button, VStack } from '@chakra-ui/react';
import { RiContactsBookFill } from 'react-icons/ri';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <>
      <VStack>
        <Link to="/thirdparty">
          <Button
            size="sm"
            bg={'#DDD8C3'}
            color={'#3E373D'}
            leftIcon={<RiContactsBookFill />}
          >
            Third Party Providers
          </Button>
        </Link>
        <Link to="/appointments">
          <Button
            size="sm"
            bg={'#DDD8C3'}
            color={'#3E373D'}
            leftIcon={<FaRegCalendarCheck />}
          >
            My Appointments
          </Button>
        </Link>
      </VStack>
    </>
  );
};

export default Menu;
