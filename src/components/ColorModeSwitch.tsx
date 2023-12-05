import { HStack, Switch, useColorMode } from '@chakra-ui/react';
import { MdOutlineDarkMode } from 'react-icons/md';

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === 'dark'}
        onChange={toggleColorMode}
      />
      <MdOutlineDarkMode />
    </HStack>
  );
};

export default ColorModeSwitch;
