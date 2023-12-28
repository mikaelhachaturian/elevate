import { Button, HStack } from '@chakra-ui/react';
import { IoMdExit } from 'react-icons/io';
import useAuth from '../../../../stores/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignOutBtn = () => {
  const signOut = useAuth((state) => state.signOut);
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const id_token = useAuth((state) => state.session?.data.id_token);

  const signOutHandler = async () => {
    axios.delete(`${backendURL}/api/users`, { params: { id_token } });
    signOut();
  };

  return (
    <>
      <HStack>
        <Button
          variant="ghost"
          leftIcon={<IoMdExit />}
          onClick={() => {
            signOutHandler();
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
