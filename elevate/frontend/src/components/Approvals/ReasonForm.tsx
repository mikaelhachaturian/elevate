import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import BackendAPIClient from '../../services/api-client';

interface Props {
  changeRequestId: string;
}
const apiClient = new BackendAPIClient('/api/changes');

const ReasonForm = ({ changeRequestId }: Props) => {
  const [reason, setReason] = useState('');

  const declineRequest = async () => {
    const payload = {
      approval: false,
      changeRequestId: changeRequestId,
      info: reason,
    };
    await apiClient.post(payload);
  };
  return (
    <VStack spacing={4} as="form" onSubmit={declineRequest}>
      <FormControl>
        <FormLabel htmlFor="reason">Please Provide Reason:</FormLabel>
        <Input
          id="reason"
          placeholder="Enter a reason.."
          required
          onChange={(e) => setReason(e.target.value)}
        />
      </FormControl>
      <Button
        size={'sm'}
        bg={'#DDD8C3'}
        color={'#3E373D'}
        rightIcon={<IoIosSend />}
        type="submit"
      >
        Send
      </Button>
    </VStack>
  );
};

export default ReasonForm;
