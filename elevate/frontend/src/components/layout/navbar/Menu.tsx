import { Button, VStack } from '@chakra-ui/react';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { RiBankFill, RiContactsBookFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { LuDoorOpen } from 'react-icons/lu';
import { MdOutlineChangeCircle } from 'react-icons/md';
import useAuth from '../../../stores/auth';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const Menu = () => {
  const role = useAuth((state) => state.session?.data.role);
  if (role === 'user')
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
          <Link to="/changes/doors">
            <Button
              size="sm"
              color={'#DDD8C3'}
              leftIcon={<LuDoorOpen />}
              _hover={{ bg: '#836862' }}
              variant="ghost"
            >
              Door Changes
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
          <Link to="/changes">
            <Button
              size="sm"
              color={'#DDD8C3'}
              leftIcon={<MdOutlineChangeCircle />}
              _hover={{ bg: '#836862' }}
              variant="ghost"
            >
              My Changes
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
        </VStack>
      </>
    );
  if (role === 'contractor')
    return (
      <>
        <VStack>
          <Link to="/approvals">
            <Button
              size="sm"
              color={'#DDD8C3'}
              leftIcon={<IoMdCheckmarkCircleOutline />}
              _hover={{ bg: '#836862' }}
              variant="ghost"
            >
              Approvals
            </Button>
          </Link>
        </VStack>
      </>
    );
};

export default Menu;
