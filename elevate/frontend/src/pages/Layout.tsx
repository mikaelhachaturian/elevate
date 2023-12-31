import { Center, Grid, GridItem, Show } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Layout/NavBar/NavBar';

const Layout = () => {
  return (
    <>
      <Grid
        templateAreas={{
          lg: `"aside main"`,
          base: `"main"`,
        }}
        templateColumns={{
          base: '1fr',
          lg: '200px 1fr',
        }}
      >
        <Show above="lg">
          <GridItem bg="#3E373D" area={'aside'}>
            <NavBar />
          </GridItem>
        </Show>
        <GridItem area={'main'}>
          <Center padding={'3'}>
            <Outlet />
          </Center>
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
