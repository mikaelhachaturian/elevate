import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react';
import ReasonForm from './ReasonForm';

interface Props {
  changeRequestId: string;
}

const DeclinePopUp = ({ changeRequestId }: Props) => {
  return (
    <Popover placement="right-end">
      <PopoverTrigger>
        <Button bg={'#DDD8C3'} color={'#3E373D'}>
          Decline
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <VStack padding={2}>
          <PopoverBody>
            <ReasonForm changeRequestId={changeRequestId} />
          </PopoverBody>
        </VStack>
      </PopoverContent>
    </Popover>
  );
};

export default DeclinePopUp;
