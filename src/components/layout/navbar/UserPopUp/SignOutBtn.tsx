import { Button, HStack } from '@chakra-ui/react';
import { IoMdExit } from 'react-icons/io';
import useAuth from '../../../../stores/auth';
import { useNavigate } from 'react-router-dom';

const SignOutBtn = () => {
  const signOut = useAuth((state) => state.signOut);
  const navigate = useNavigate();
  return (
    <>
      <HStack>
        <Button
          variant="ghost"
          leftIcon={<IoMdExit />}
          onClick={() => {
            signOut();
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
