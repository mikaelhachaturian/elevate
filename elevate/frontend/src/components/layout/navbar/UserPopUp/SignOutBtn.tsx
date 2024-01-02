import { Button, HStack } from '@chakra-ui/react';
import { IoMdExit } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../stores/auth';

const SignOutBtn = () => {
  const signOut = useAuth((state) => state.signOut);
  const navigate = useNavigate();
  const userEmail = useAuth((state) => state.session?.data.email);

  return (
    <>
      <HStack>
        <Button
          variant="ghost"
          leftIcon={<IoMdExit />}
          onClick={() => {
            signOut(userEmail as string);
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
