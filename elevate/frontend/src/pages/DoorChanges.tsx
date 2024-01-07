import { Heading, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import ChangesForm from '../components/Changes/Doors/ChangesForm';
import StandardDoor from '../components/Changes/Doors/StandardDoor';

export const DoorChanges = () => {
  const [isChangeSpecs, setIsChangeSpecs] = useState(false);
  const changeToForm = () => {
    setIsChangeSpecs(!isChangeSpecs);
  };
  return (
    <>
      <VStack p={4}>
        <Heading>Door Changes</Heading>
        {isChangeSpecs ? (
          <ChangesForm />
        ) : (
          <StandardDoor setIsChangeSpecs={changeToForm} />
        )}
      </VStack>
    </>
  );
};
