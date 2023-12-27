import { HStack, Switch, useColorMode, Text } from '@chakra-ui/react';
import { MdOutlineDarkMode } from 'react-icons/md';

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack paddingX={'4'}>
      <MdOutlineDarkMode />
      <Text>
        {colorMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </Text>
      <Switch
        colorScheme="green"
        isChecked={colorMode === 'dark'}
        onChange={toggleColorMode}
      />
    </HStack>
  );
};

export default ColorModeSwitch;
