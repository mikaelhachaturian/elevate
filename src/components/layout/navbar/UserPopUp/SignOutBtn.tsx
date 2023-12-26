import { Button, HStack } from '@chakra-ui/react';
import { IoMdExit } from 'react-icons/io';

const SignOutBtn = () => {
  return (
    <>
      <HStack>
        <Button variant="ghost" leftIcon={<IoMdExit />}>
          Sign Out
        </Button>
      </HStack>
    </>
  );
};

export default SignOutBtn;
