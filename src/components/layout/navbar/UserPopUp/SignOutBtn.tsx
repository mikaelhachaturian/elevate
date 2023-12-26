import { Button, HStack } from '@chakra-ui/react';
import { IoMdExit } from 'react-icons/io';
import useAuth from '../../../../stores/auth';
import { useNavigate } from 'react-router-dom';

const SignOutBtn = () => {
  const updateAuth = useAuth((state) => state.updateAuth);
  const navigate = useNavigate();
  return (
    <>
      <HStack>
        <Button
          variant="ghost"
          leftIcon={<IoMdExit />}
          onClick={() => {
            updateAuth();
            navigate('/login');
          }}
        >
          Sign Out
        </Button>
      </HStack>
    </>
  );
};

export default SignOutBtn;
