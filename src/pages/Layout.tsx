import { Outlet } from 'react-router-dom';
import { Grid, GridItem, Show } from '@chakra-ui/react';
import NavBar from '../components/layout/navbar/NavBar';

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
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
